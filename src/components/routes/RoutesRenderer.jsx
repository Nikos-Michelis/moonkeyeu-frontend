import {Route, Routes} from "react-router-dom";
import React from "react";
import RouterConfig from "@/components/routes/RouterConfig.jsx";
import PageLayout from "@/layout/PageLayout.jsx";

const RoutesRenderer = () => {
    const routes = RouterConfig();

    const renderRoutes = (routesArray) => {
        return routesArray.map((route, i) => (
            <Route
                key={i}
                path={route.index ? undefined : route.path}
                index={route.index || undefined}
                element={route.element}
            >
                {route.children && renderRoutes(route.children)}
            </Route>
        ));
    };

    return (
        <Routes>
            <Route element={<PageLayout />}>
                { renderRoutes(routes) }
            </Route>
        </Routes>
    );
};
export default RoutesRenderer;
