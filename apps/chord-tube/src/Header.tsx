
import Sidebar from "./components/sidebar";
import logo from "./assets/images/logo.webp"
import SearchInput from "./components/searchInput";
import MobileSearchDrawer from "./components/mobileSearchDrawer";
import NavBarbuttonGroup from "./components/navBarbuttonGroup";
import { Button } from "@mui/material";



const Header = () => {
    return (
        <header className="">
            <nav className=" flex px-[2%] justify-between items-center mx-auto fixed top-0 left-0 w-full bg-gray-950 py-1 z-[999] ">
                <div className=" flex items-center">
                    <div className=" lg:flex hidden">
                        <Sidebar />
                    </div>
                    <Button onClick={() => window.location.href = "/home"} variant="text" className=" md:w-[130px] w-[120px] hover:!bg-transparent hover:scale-[102%] !transition-all  ">
                        <img src={logo} alt="" />
                    </Button>
                </div>
                <div className=" lg:flex w-full max-w-[500px] hidden">
                    <SearchInput />
                </div>

                <div className=" flex gap-1 lg:hidden ">
                    <Sidebar />
                    <MobileSearchDrawer />
                </div>
                <div className="lg:flex hidden">
                    <NavBarbuttonGroup />
                </div>
            </nav>
        </header>

    )
}

export default Header