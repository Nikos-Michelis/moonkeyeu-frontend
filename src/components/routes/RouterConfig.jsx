import {Navigate} from "react-router-dom";
import React from "react";
import Home from "@/pages/Home.jsx";
import Launch from "@/pages/articles/Launch.jsx";
import {Layout} from "@/layout/Layout.jsx";
import Programs from "@/pages/Programs.jsx";
import Program from "@/pages/articles/Program.jsx";
import Astronaut from "@/pages/articles/Astronaut.jsx";
import Astronauts from "@/pages/Astronauts.jsx";
import Vehicles from "@/pages/Vehicles.jsx";
import Spacecraft from "@/pages/Spacecraft.jsx";
import SpacecraftConfig from "@/pages/articles/SpacecraftConfig.jsx";
import Rockets from "@/pages/Rockets.jsx";
import Boosters from "@/pages/Boosters.jsx";
import Profile from "@/pages/user/Profile.jsx";
import ChangePassword from "@/pages/user/ChangePassword.jsx";
import Dashboard from "@/pages/dashboard/Dashboard.jsx";
import Messages from "@/pages/dashboard/Messages.jsx";
import EtlReport from "@/pages/dashboard/EtlReport.jsx";
import MembersReport from "@/pages/dashboard/MembersReport.jsx";
import MyLaunches from "@/pages/user/MyLaunches.jsx";
import Bookmarks from "@/pages/user/Bookmarks.jsx";
import {ProtectedRoutes} from "@/components/routes/ProtectedRoutes.jsx";
import Locations from "@/pages/Locations.jsx";
import LaunchPad from "@/pages/articles/LaunchPad.jsx";
import ResetPassword from "@/pages/user/ResetPassword.jsx";
import FallbackComponent from "@/components/fallback/FallbackComponent.jsx";
import News from "@/pages/News.jsx";
import Agencies from "@/pages/Agencies.jsx";
import Agency from "@/pages/articles/Agency.jsx";
import NasaApodArticle from "@/pages/articles/NasaApodArticle.jsx";

const RouterConfig = () => {
    const sections = [
        { base: "launches", index: Home, nested: { path: ":id", component: Launch } },
        { base: "programs", index: Programs, nested: { path: ":id", component: Program } },
        { base: "astronauts", index: Astronauts, nested: { path: ":id", component: Astronaut } },
        { base: "agencies", index: Agencies, nested: { path: ":id", component: Agency } },
        { base: "profile", index: Profile, nested: { path: "change-password", component: ChangePassword, layout: ProtectedRoutes } },
        { base: "dashboard", index: Dashboard,
            array: [
                { path: "messages", component: Messages },
                { path: "etl-report", component: EtlReport },
                { path: "members", component: MembersReport }
            ], layout: ProtectedRoutes
        },
        { base: "vehicles", index: Vehicles,
            array: [
                { base: "spacecraft", index: Spacecraft, nested: { path: ":id", component: SpacecraftConfig }},
                { base: "rockets", component: Rockets },
                { base: "launchers", component: Boosters }
            ], layout: Layout
        },
        { base: "bookmarks", index: Bookmarks, nested: { path: ":name", component: MyLaunches, layout: ProtectedRoutes } },
        { base: "locations", index: Locations, nested: { path: ":id", component: LaunchPad } },
        { base: "news", index: News},
        { base: "nasa-apod",  component: NasaApodArticle  },
        { base: "account/reset-password/:token", nested: { path: ":id", component: ResetPassword } },
        { base: "contact", index: Locations, nested: { path: ":id", component: LaunchPad } },
        { base: "privacy", index: Locations, nested: { path: ":id", component: LaunchPad } },
        {
            base: "*",
            nested: {
                component: () => (<FallbackComponent code={404} message="Oops! Something went wrong." error="404 Page Not Found" />)
            }
        }
    ];

    const generateChildrenRoutes = (section) => {
        const children = [];

        if (section.index) {
            children.push({ index: true, element: <section.index /> });
        }

        if (section.nested) {
            const path = section.nested.path ? section.nested.path : ":id";
            const Component = section.nested.component || section.nested;
            children.push({ path, element: <Component /> });
        }

        if (section.array) {
            const component = section.nested ? section?.nested?.component : section.component;
            const arrayRoutes = section.array.map((route) => ({
                path: route.base,
                index: !!route.index,
                element: <route.component />,
            }));
            children.push(...arrayRoutes);
        }

        return children;
    };

    const routes = [
        { path: "/", element: <Navigate to="/launches" /> },
        ...sections.map((section) => {
            const RouteLayout = section.layout;
            return {
                path: `/${section.base}`,
                element: RouteLayout ? (<RouteLayout><Layout /></RouteLayout>) : (<Layout />),
                children: generateChildrenRoutes(section),
            };
        }),
    ];
    console.log(routes)
    return([...routes]);
}

export default RouterConfig;