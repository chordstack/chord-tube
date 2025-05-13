
import type { ReactNode } from "react";
import Header from "./Header";

type LayoutProps = {
    children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="bg-gray-900 text-white">
            <div className="min-h-screen flex flex-col px-[2.5%] mx-auto pb-10">
                <Header />
                <div className=" mt-20">
                    {children}
                </div>
            </div>
        </div >
    );
}
