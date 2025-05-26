// src/routes.tsx
import { lazy, Suspense, type ReactNode } from "react";
import { type RouteObject } from "react-router-dom";
import Layout from "./layout";
import { Loading } from "./components/loading";

const Home = lazy(() => import("./pages/Home"));
const Detail = lazy(() => import("./pages/Detail"));

const withSuspense = (component: ReactNode) => (
    <Suspense fallback={<Loading />}>{component}</Suspense>
);

const routes: RouteObject[] = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: withSuspense(<Home />),
            },
            {
                path: ":name",
                element: withSuspense(<Home />),
            },
            {
                path: "detail/:id",
                element: withSuspense(<Detail />),
            },
        ],
    },
];

export default routes;
