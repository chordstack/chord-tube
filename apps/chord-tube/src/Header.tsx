
import Sidebar from "./components/sidebar";
import logo from "./assets/images/logo.webp"
import SearchInput from "./components/searchInput";
import MobileSearchDrawer from "./components/mobileSearchDrawer";
import NavBarbuttonGroup from "./components/navBarbuttonGroup";





const Header = () => {
    return (
        <header className="">
            <nav className="  flex justify-between items-center ">
                <div className=" flex items-center">
                    <div className=" lg:flex hidden">
                        <Sidebar />
                    </div>
                    <figure className=" md:w-[150px] w-[120px]">
                        <img src={logo} alt="" />
                    </figure>
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
        </header >

    )
}

export default Header