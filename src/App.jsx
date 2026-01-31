import React from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
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
import LaunchArticle from "@/pages/articles/LaunchArticle.jsx";
import AstronautArticle from "@/pages/articles/AstronautArticle.jsx";
import ProgramArticle from "@/pages/articles/ProgramArticle.jsx";
import SpacecraftConfigArticle from "@/pages/articles/SpacecraftConfigArticle.jsx";
import NasaApodArticle from "@/pages/articles/NasaApodArticle.jsx";
import LaunchPadArticle from "@/pages/articles/LaunchPadArticle.jsx";
import AgencyArticle from "@/pages/articles/AgencyArticle.jsx";
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
import GoTop from "@/components/button/GoTop.jsx";
import PageLayout from "@/layout/PageLayout.jsx";
import {AuthProvider} from "@/context/AuthProvider.jsx";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {NasaApodProvider} from "@/context/NasaApodProvider.jsx";
import {SpaceFlightNewsProvider} from "@/context/SpaceFlightNewsProvider.jsx";
import BuildProviderTree from "@/context/BuildProviderTree.jsx";
import {ThemeProvider} from "@/context/ThemeProvider.jsx";
import ToastPortal from "@/portals/ToastPortal.jsx";

function App() {
    const[cookies] = useCookies(["cookieConsent"])
    const ProvidersTree = BuildProviderTree([
        [ThemeProvider],
        [SpaceFlightNewsProvider],
        [NasaApodProvider],
        [GoogleOAuthProvider, { clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID}],
        [AuthProvider],
    ]);
    const NOT_FOUND = 404;
    return (
        <ProvidersTree>
            <BrowserRouter>
                <Routes>
                    <Route element={<PageLayout />}>
                        <Route path="/" element={<Navigate to="/launches" />} />
                        <Route path="/launches" element={<Layout />}>
                            <Route index element={<Home />} />
                            <Route path=":id" element={<LaunchArticle/>} />
                        </Route>
                        <Route path="/programs" element={<Layout />}>
                            <Route index element={<Programs />} />
                            <Route path=":id" element={<ProgramArticle />} />
                        </Route>
                        <Route path="/astronauts" element={<Layout />}>
                            <Route index element={<Astronauts />} />
                            <Route path=":id" element={<AstronautArticle />} />
                        </Route>
                        {<Route path="/agencies" element={<Layout />}>
                            <Route index element={<Agencies />} />
                            <Route path=":id" element={<AgencyArticle />}/>
                        </Route>}
                        <Route path="/vehicles" element={<Layout />}>
                            <Route index element={<Vehicles />} />
                            <Route path="spacecraft" element={<Layout />}>
                                <Route index element={<Spacecraft />} />
                                <Route path=":id" element={<SpacecraftConfigArticle />} />
                            </Route>
                            <Route path="rockets" element={<Rockets />}/>
                            <Route path="launchers" element={<Boosters />}/>
                        </Route>
                        <Route path="/profile" element={<ProtectedRoutes><Layout /></ProtectedRoutes>}>
                            <Route index element={<Profile />} />
                            <Route path="change-password" element={<ChangePassword />} />
                        </Route>
                        <Route path="/dashboard" element={<ProtectedRoutes><Layout /></ProtectedRoutes>}>
                            <Route index element={<Dashboard />} />
                            <Route path="messages" element={<Messages />}/>
                            <Route path="etl-report" element={<EtlReport />}/>
                            <Route path="members" element={<MembersReport />}/>
                        </Route>
                        <Route path="/bookmarks" element={<ProtectedRoutes><Layout /></ProtectedRoutes>} >
                            <Route index element={<Bookmarks />} />
                            <Route path=":name" element={<MyLaunches />} />
                        </Route>
                        <Route path="/locations" element={<Layout />}>
                            <Route index element={<Locations />} />
                            <Route path=":id" element={<LaunchPadArticle />} />
                        </Route>
                        <Route path="/news" element={<News />} />
                        <Route path="/nasa-apod" element={<NasaApodArticle/>}></Route>
                        <Route path='/account/reset-password/:token' exact={true} element={<ResetPassword />} />
                        <Route path='/contact' element={<Contact />} />
                        <Route path='/privacy' element={<PrivacyPolicy />} />
                        <Route
                            path='*'
                            exact={true}
                            element={<FallbackComponent code={NOT_FOUND} message="Oops! Somthing went wrong, try again later." error="404 Page Not Found"/>} />
                    </Route>
                </Routes>
                <ToastPortal />
                {!cookies.cookieConsent && <CookieConsent/>}
                <GoTop />
            </BrowserRouter>
        </ProvidersTree>
    )
}
export default App
