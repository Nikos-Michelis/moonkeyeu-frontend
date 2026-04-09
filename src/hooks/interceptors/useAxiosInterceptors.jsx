import {useLayoutEffect} from "react";
import {api} from "@/services/api.jsx";
import setupInterceptors from "@/hooks/interceptors/setupInterceptors.js";
import {useQueryClient} from "@tanstack/react-query";

export const useAxiosInterceptors = (jwtToken, setJwtToken, csrfToken, setIsSyncingJwt) => {
    const queryClient = useQueryClient();

    useLayoutEffect(() => {
        const { requestIntercept, responseIntercept } =
            setupInterceptors(
                jwtToken,
                setJwtToken,
                csrfToken,
                setIsSyncingJwt,
                queryClient
            );
        return () => {
            api.interceptors.request.eject(requestIntercept);
            api.interceptors.response.eject(responseIntercept);
        };
    }, [jwtToken, setJwtToken, setIsSyncingJwt, csrfToken, queryClient]);
};