// components/Layout.tsx

import type { ReactNode } from "react";
import Header from "./Header";

type LayoutProps = {
    children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="bg-gray-900 text-white">
            <div className="min-h-screen flex flex-col px-[2.5%] mx-auto ">
                <Header />
                {children}
                <footer className="bg-gray-800 p-4 text-center">My Footer</footer>
            </div>
        </div >
    );
}
