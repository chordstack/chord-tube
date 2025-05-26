// src/layout.tsx
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
    return (
        <div className="bg-gray-950 text-white">
            <div className="min-h-screen flex flex-col px-[2.5%] mx-auto pb-10">
                <Header />
                <div className="mt-20">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
