import {useAuth} from "@/context/AuthProvider.jsx";
import {Navigate} from "react-router-dom";
import SpinnerLoader from "@/components/loader/SpinnerLoader.jsx";

export function ProtectedRoutes({ children }) {
    const { status } = useAuth();

    if (status.isFetching) {
        return <SpinnerLoader/>
    }

    if (!status.isFetching && !status.isSuccess) {
        return <Navigate to="/launches" />;
    }

    return <>{children}</>;
}


