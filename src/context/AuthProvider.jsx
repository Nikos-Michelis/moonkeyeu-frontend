import {createContext, useContext, useState, useCallback, useEffect, useMemo} from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {handlePost} from "@/services/api.jsx";
import {useSimpleQuery} from "@/services/queries.jsx";
import {useAxiosInterceptors} from "@/hooks/interceptors/useAxiosInterceptors.jsx";
import showErrorToast from "@/components/utils/ShowErrorToast.jsx";

const SecurityContext = createContext(null);

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const LOGOUT_URL = BASE_URL + '/user/logout';
const ACCOUNT_URL = BASE_URL + '/user/my-account';
const CSRF_TOKEN_URL = BASE_URL + '/csrf/token';

export const AuthProvider = ({ children }) => {
    const queryClient = useQueryClient();
    const [jwtToken, setJwtToken] = useState(null);
    const [isSyncingJwt, setIsSyncingJwt] = useState(false);
    const csrfQuery
        = useSimpleQuery({
        url: CSRF_TOKEN_URL,
        cacheKey: "csrf",
        placeholderData: false,
        refetchOnWindowFocus: false,
        staleTime: 15 * 60 * 1000,
        queryOptions:{
            retry: 1,
        },
        options: { withCredentials: true, Bearer: false }
    });
    const csrfToken = csrfQuery?.data?.token;
    const userQuery
        = useSimpleQuery({
        url: ACCOUNT_URL,
        cacheKey: "user",
        placeholderData: false,
        refetchOnWindowFocus: false,
        staleTime: 15 * 60 * 1000,
        queryOptions:{
            enabled: !!csrfToken,
            retry: false
        },
        options: { withCredentials: false, Bearer: true }
    });
    
    const logoutMutation = useMutation({
        mutationFn: ({ data, url, options }) => handlePost(url, data, options),
    });
    
    const logout = useCallback( () => {
        logoutMutation.mutate(
            { url: LOGOUT_URL, options: { withCredentials: true, Bearer: false }
            }, {
                onSuccess: () => {
                    setJwtToken(null);
                    queryClient.removeQueries({ queryKey: ["user"] });
                    queryClient.removeQueries({ queryKey: ["csrf"] });
                    toast.success("You have been logged out successfully. See you next time!");
                },
                onError: (error) => {
                    showErrorToast(error, error?.response?.data?.error);
                },
            }
        )
    }, [logoutMutation, queryClient]);

    useAxiosInterceptors(jwtToken, setJwtToken, csrfToken, setIsSyncingJwt);
    
    useEffect(() => {
        if (userQuery.isSuccess && userQuery.data) {
            toast.success(`Welcome, ${userQuery.data.username}!`);
        }
    }, [userQuery.isSuccess, userQuery.data]);

    const providerValues = useMemo(() => {
        const isFetching = (csrfQuery.isFetching) || (userQuery?.isFetching);
        const isAuthenticated = !!jwtToken && !!userQuery.data;
        return {
            jwtToken,
            setJwtToken,
            user: userQuery.data || undefined,
            status: {
                isPending: csrfQuery.isPending || userQuery?.isPending,
                isFetching: isFetching || isSyncingJwt,
                isError: userQuery.isError || csrfQuery.isError,
                isSuccess: isAuthenticated && !isSyncingJwt
            },
            logout,
            csrfToken,
        };
    }, [
        csrfQuery.isFetching, csrfQuery.isPending, csrfQuery.isError,
        userQuery?.isFetching, userQuery.data, userQuery?.isPending, userQuery.isError,
        jwtToken, isSyncingJwt, csrfToken, logout
    ]);
    return (
        <SecurityContext.Provider value={providerValues}>
            {children}
        </SecurityContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(SecurityContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
