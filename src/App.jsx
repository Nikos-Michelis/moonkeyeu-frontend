import React from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Header from "./layout/Header.jsx";
import Home from "@/pages/Home.jsx";
import Astronauts from "./pages/Astronauts.jsx";
import Programs from "@/pages/Programs.jsx";
import Locations from "./pages/Locations.jsx";
import Vehicles from "./pages/Vehicles.jsx";
import Rockets from "@/pages/Rockets.jsx";
import Boosters from "@/pages/Boosters.jsx";
import News from "./pages/News.jsx";
import Contact from "@/pages/Contact.jsx";
import PrivacyPolicy from "@/pages/PrivacyPolicy.jsx";
import Agencies from "@/pages/Agencies.jsx";
import Spacecraft from "@/pages/Spacecraft.jsx";
import Launch from "@/pages/articles/Launch.jsx";
import Astronaut from "@/pages/articles/Astronaut.jsx";
import Program from "@/pages/articles/Program.jsx";
import SpacecraftConfig from "@/pages/articles/SpacecraftConfig.jsx";
import NasaApodArticle from "@/pages/articles/NasaApodArticle.jsx";
import LaunchPad from "@/pages/articles/LaunchPad.jsx";
import Agency from "@/pages/articles/Agency.jsx";
import Profile from "@/pages/user/Profile.jsx";
import ResetPassword from "@/pages/user/ResetPassword.jsx";
import Bookmarks from "@/pages/user/Bookmarks.jsx";
import MyLaunches from "@/pages/user/MyLaunches.jsx";
import ChangePassword from "@/pages/user/ChangePassword.jsx";
import Dashboard from "@/pages/dashboard/Dashboard.jsx";
import Messages from "@/pages/dashboard/Messages.jsx";
import MembersReport from "@/pages/dashboard/MembersReport.jsx";
import EtlReport from "@/pages/dashboard/EtlReport.jsx";
import { Layout } from "@/layout/Layout.jsx";
import FallbackComponent from "@/components/fallback/FallbackComponent.jsx";
import { ProtectedRoutes } from "@/components/routes/ProtectedRoutes.jsx";
import CookieConsent from "@/components/cookie/CookieConsent.jsx";
import { useCookies } from "react-cookie";
import ModalLayout from "@/layout/ModalLayout.jsx";
import GoTop from "@/components/button/GoTop.jsx";
import PageLayout from "@/layout/PageLayout.jsx";
import { ModalPortal } from "@/portals/ModalPortal.jsx";
import {AuthProvider} from "@/context/AuthProvider.jsx";
import {ModalProvider} from "@/context/ModalProvider.jsx";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {NasaApodProvider} from "@/context/NasaApodProvider.jsx";
import {SpaceFlightNewsProvider} from "@/context/SpaceFlightNewsProvider.jsx";
import BuildProviderTree from "@/context/BuildProviderTree.jsx";
import RoutesRenderer from "@/components/routes/RoutesRenderer.jsx";


function App() {
    const[cookies] = useCookies(["cookieConsent"])
    const ProvidersTree = BuildProviderTree([
        [SpaceFlightNewsProvider],
        [NasaApodProvider],
        [GoogleOAuthProvider, { clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID}],
        [ModalProvider],
        [AuthProvider],
    ]);
    return (
        <ProvidersTree>
            <BrowserRouter>
                <RoutesRenderer/>
                <ModalPortal>
                    <ModalLayout/>
                </ModalPortal>
                {!cookies.cookieConsent && <CookieConsent/>}
                <GoTop />
            </BrowserRouter>
        </ProvidersTree>
    )
}
export default App
