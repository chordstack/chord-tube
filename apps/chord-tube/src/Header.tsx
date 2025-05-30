import { useLocation } from "react-router-dom";
import Sidebar from "./components/sidebar";
import logo from "./assets/images/logo.webp";
import SearchInput from "./components/searchInput";
import MobileSearchDrawer from "./components/mobileSearchDrawer";
import NavBarbuttonGroup from "./components/navBarbuttonGroup";
import { Button } from "@mui/material";

const Header = () => {
  const location = useLocation();

  // Check if current path starts with "/detail/"
  const isDetailPage = location.pathname.startsWith("/detail/");

  return (
    <header className="">
      <nav
        className={`flex md:px-[2%] justify-between items-center mx-auto  w-full md:py-1 z-[999] ${
          isDetailPage ? "bg-transparent h-fit relative" : "bg-gray-950 fixed top-0 left-0"
        }`}
      >
        <div className="flex items-center">
          <div className="lg:flex hidden">
            <Sidebar />
          </div>
          <Button
            onClick={() => (window.location.href = "/home")}
            variant="text"
            className="md:w-[130px] w-[100px] hover:!bg-transparent hover:scale-[102%] !transition-all"
          >
            <img src={logo} alt="" />
          </Button>
        </div>
        <div className="lg:flex w-full max-w-[500px] hidden">
          <SearchInput />
        </div>

        <div className="flex md:gap-1 lg:hidden">
          <Sidebar />
          <MobileSearchDrawer />
        </div>
        <div className="lg:flex hidden">
          <NavBarbuttonGroup />
        </div>
      </nav>
    </header>
  );
};

export default Header;
