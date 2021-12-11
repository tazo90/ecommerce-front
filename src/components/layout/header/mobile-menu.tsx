import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Link from "@components/ui/link";
import Scrollbar from '@components/common/scrollbar';
import Logo from '@components/ui/logo';
import { siteSettings } from '@settings/site.settings';
import { setDrawerView } from '@slices/ui.slice';
import { IoIosArrowDown } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';

export default function MobileMenu() {
  const dispatch = useDispatch();
  const [activeMenus, setActiveMenus] = useState([]);
  const { siteHeader } = siteSettings;
  
  function handleArrowClick(menuName: string) {
    const newActiveMenus = [...activeMenus];

    if (newActiveMenus.includes(menuName)) {
      const index = newActiveMenus.indexOf(menuName);
      if (index > -1) {
        newActiveMenus.splice(index, 1);
      }
    } else {
      newActiveMenus.push(menuName);
    }

    setActiveMenus(newActiveMenus);
  }

  function handleCloseMenu() {
    dispatch(setDrawerView(null));
  }

  function ListMenu({
		dept,
		data,
		hasSubMenu,
		menuName,
		menuIndex,
		className = "",
	}: any) {
    if (!data.label) {
      return null;
    }

    return (      
      <li className={`mb-0.5 ${className}`}>
        <div className="flex items-center justify-between">
          <Link
            href={data.path}
            className="w-full text-[15px] menu-item relative py-3 ps-5 md:ps-7 pe-4 transition duration-300 ease-in-out"
          >
            <span className="block w-full" onClick={() => handleCloseMenu()}>
              {data.label}
            </span>
          </Link>
          {hasSubMenu && (
            <div
              className="cursor-pointer w-16 md:w-20 h-8 text-lg flex-shrink-0 flex items-center justify-center"
              onClick={() => handleArrowClick(menuName)}
            >
              <IoIosArrowDown
                className={`transition duration-200 ease-in-out transform text-heading ${
                  activeMenus.includes(menuName) ? "-rotate-180" : "rotate-0"
                }`}
              />
            </div>
          )}
        </div>
        {hasSubMenu && (
          <SubMenu
            dept={dept}
            data={data.subMenu}
            toggle={activeMenus.includes(menuName)}
            menuIndex={menuIndex}
          />
        )}
      </li>
    );
  };

  function SubMenu({ dept, data, toggle, menuIndex}: any) {
    if (!toggle) {
      return null;
    }

    dept += 1;

    return (
      <ul className="pt-0.5">
        {data?.map((menu: any, index: number) => {
          const menuName: string = `sidebar-submenu-${dept}-${menuIndex}-${index}`;

          return (
            <ListMenu 
              dept={dept}
              data={menu}
              hasSubMenu={menu.subMenu}
              menuName={menuName}
              key={menuName}
              menuIndex={index}
              className={dept > 1 && 'ps-4'}
            />
          )
        })}
      </ul>
    )
  }

  return (
    <>
      <div className="flex flex-col justify-between w-full h-full">
        <div className="w-full border-b border-gray-100 flex justify-between items-center relative ps-5 md:ps-7 flex-shrink-0 py-0.5">
          <Logo />

          <button
            className="flex text-2xl items-center justify-center text-gray-500 px-4 md:px-5 py-6 lg:py-8 focus:outline-none transition-opacity hover:opacity-60"
            onClick={() => handleCloseMenu()}
            aria-label="close"
          >
            <IoClose className="text-black mt-1 md:mt-0.5" />
          </button>
        </div>

        <Scrollbar className="menu-scrollbar flex-grow mb-auto">
          <div className="flex flex-col py-7 px-0 lg:px-2 text-heading">
            <ul className="mobileMenu">
              {siteHeader.mobileMenu.map((menu, index) => {
                const dept: number = 1;
                const menuName: string = `sidebar-menu-${dept}-${index}`;

                return (
                  <ListMenu
                    dept={dept}
                    data={menu}
                    hasSubMenu={menu.subMenu}
                    menuName={menuName}
                    key={menuName}
                    menuIndex={index}
                  />
                )
              })}
            </ul>
          </div>
        </Scrollbar>
      </div>
    </>
  )
}