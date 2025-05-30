// src/layout.tsx
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
    return (
        <div className="bg-gray-950 text-gray-50 overflow-hidden">
            <div className="min-h-screen flex flex-col px-[2.5%] mx-auto pb-10">
                <Header />
                    <Outlet />
            </div>
        </div>
    );
}
