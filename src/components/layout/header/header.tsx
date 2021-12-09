import React, { useRef } from 'react';
import HeaderMenu from './header-menu';
import { siteSettings } from "@settings/site.settings";
import Logo from '@components/ui/logo';

type DivElementRef = React.MutableRefObject<HTMLDivElement>;

const { siteHeader } = siteSettings;

function Header() {
  // const {
  //   openSidebar,
  //   setDrawerView,
  //   openSearch,
  //   openModal,
  //   setModalView,
  //   isAuthorized
  // } = useUI();

  const siteHeaderRef = useRef() as DivElementRef;

  // function handleLogin() {
  //   setModalView("LOGIN_VIEW");
  //   return openModal();
  // }

  // function handleMobileMenu() {
  //   setDrawerView("MOBILE_MENU");
  //   return openSidebar();
  // }

  return (
    <header
      id="header"
      ref={siteHeaderRef}
      className="w-full h-16 sm:h-20 lg:h24 relative z-20"
    >
      <div className="innerSticky text-gray-700 body-font fixed bg-white w-full h-16 sm:h-20 lg:h-24 z-20 ps-4 md:ps-0 lg:ps-6 pe-4 lg:pe-6 transition duration-200 ease-in-out">
        <div className="flex items-center justify-center mx-auto max-w-[1920px] h-full w-full">
          <button
            aria-label="Menu"
            className="menuBtn hidden md:flex lg:hidden flex-col items-center justify-center px-5 2xl:px-7 flex-shrink-0 h-full outline-none focus:outline-none"
            // onClick={handleMobileMenu}
          >
            <span className="menuIcon">
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
            </span>
          </button>

          <Logo />
          <HeaderMenu
            data={siteHeader.menu}
            className="hidden lg:flex md:ms-6 xl:ms-10"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;