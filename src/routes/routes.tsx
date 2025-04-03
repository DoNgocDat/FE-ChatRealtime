import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const NotFound = lazy(() => import("../pages/notfound/notfoundPage"));
const PrivateRoute = lazy(() => import("./privateRoute"));
const PublicRoute = lazy(() => import("./publicRoute"));
const IntroductPage = lazy(() => import("../pages/introduct/introductPage"));
const HomePage = lazy(() => import("../pages/home/homePage"));
const LoginPage = lazy(() => import("../pages/login/loginPage"));
const RegisterPage = lazy(() => import("../pages/register/registerPage"));
const BlogPage = lazy(() => import("../pages/blog/blogPage"));
const Meeting = lazy(() => import("../pages/metting/mettingPage"));

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <IntroductPage />,
    },
    {
        path: "/blog",
        element: <BlogPage />,
    },
    {
        path: "/meeting",
        element: <Meeting />,
    },
    {
        path: "/*",
        element: <NotFound />,
    },

    {
        element: <PublicRoute />,
        children: [
            { path: "/login", element: <LoginPage /> },
            { path: "/register", element: <RegisterPage /> },
        ],
    },

    {
        element: <PrivateRoute />,
        children: [
            { path: "/home", element: <HomePage /> }
        ],
    },
];