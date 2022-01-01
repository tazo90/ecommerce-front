import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { SearchIcon } from "@components/icons";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoMenuOutline } from "react-icons/io5";
import Link from "@components/ui/link";
import { Drawer } from "@components/common/drawer/drawer";
import { openSearch, setDrawerView } from "@slices/ui.slice";
import Logo from "@components/ui/logo";

const CartButton = dynamic(() => import("@components/cart/cart-button"), {
  ssr: false,
});
const MobileMenuSide = dynamic(
  () => import("@components/layout/header/mobile-menu-side")
);

interface BottomNavigationProps {
  top: boolean;
}

function BottomNavigation({ top }: BottomNavigationProps) {
  const dispatch = useDispatch();
  const { drawerView } = useSelector((state) => state.ui);

  function handleMobileMenu() {
    dispatch(setDrawerView("MOBILE_MENU"));
  }

  return (
    <>
      <div
        className={`${
          top ? "top-0" : "bottom-0"
        } md:hidden fixed z-10 flex items-center justify-between border-b border-gray-300 text-gray-700 body-font bg-white w-full h-12 sm:h-16 px-5`}
      >
        <div className="flex justify-start">
          <button
            aria-label="Menu"
            className="menuBtn flex flex-col items-center justify-center pr-2 flex-shrink-0 outline-none focus:outline-none"
            onClick={handleMobileMenu}
          >
            <IoMenuOutline className="text-3xl" />
          </button>
          <button
            className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none"
            onClick={() => dispatch(openSearch())}
            aria-label="search-button"
          >
            <SearchIcon />
          </button>
        </div>
        <Logo />
        <div className="flex justify-end">
          <Link href="/" className="flex-shrink-0 pr-2">
            <MdOutlineAccountCircle className="text-3xl" />
          </Link>
          <CartButton />
        </div>
      </div>
      <Drawer
        placement={"left"}
        open={drawerView === "MOBILE_MENU"}
        onClose={() => {
          dispatch(setDrawerView(null));
        }}
        handler={false}
        showMask={true}
        level={null}
        width="85%"
        contentWrapperStyle={{ left: 0 }}
      >
        <MobileMenuSide sidebarOpen={drawerView === "MOBILE_MENU"} />
      </Drawer>
    </>
  );
}

export default BottomNavigation;
