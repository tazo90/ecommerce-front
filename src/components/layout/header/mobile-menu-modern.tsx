import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Transition } from "react-transition-group";
import Link from "@components/ui/link";
import Logo from "@components/ui/logo";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { setDrawerView, setSidebarSubItems } from "@slices/ui.slice";
import { siteSettings } from "@settings/site.settings";

function getAnimationStyle(state: string, cssAnimatinoClass: string) {
  if (state === "entering") {
    return { animation: `${cssAnimatinoClass} .25s forwards` };
  } else if (state === "entered") {
    return { transform: "translateX(0)" };
  }
  return { animation: `${cssAnimatinoClass} .15s reverse backwards` };
}

function Menu({ state }) {
  let style;

  if (state === "exiting") {
    style = { animation: "moveMenu .25s forwards" };
  } else if (state === "entering") {
    style = { animation: "moveMenu .25s reverse backwards" };
  }

  const dispatch = useDispatch();

  function handleCloseMenu() {
    dispatch(setDrawerView(null));
  }

  function displayHeader() {
    return (
      <div className="w-full h-14 border-b border-gray-300 border-b-2 flex justify-between items-center relative flex-shrink-0 pl-6">
        <Logo />

        <button
          className="flex text-2xl items-center justify-center text-gray-500 px-4 md:px-5 py-6 lg:py-8 focus:outline-none transition-opacity hover:opacity-60"
          onClick={() => handleCloseMenu()}
          aria-label="close"
        >
          <IoClose className="text-black mt-1 md:mt-0.5" />
        </button>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col justify-between w-full h-full overflow-y-scroll"
      style={style}
    >
      {displayHeader()}

      {siteSettings.siteHeader.mobileMenu.map((item) => (
        <div>
          <div className="font-bold px-6 pt-2 text-lg">{item.label}</div>
          {item.subMenu?.map((subItem) => {
            if (subItem.subMenu) {
              return <MenuItem text={subItem.label} items={subItem.subMenu} />;
            }
            return (
              <Link href={subItem.path} className="w-full">
                <span className="py-2 px-6 block w-full">{subItem.label}</span>
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function SubMenu({ state }) {
  const dispatch = useDispatch();
  const { sidebarSubItems } = useSelector((state) => state.ui);
  const style = getAnimationStyle(state, "moveSubMenu");

  return (
    <div
      className="flex flex-col absolute w-full h-full overflow-y-scroll translate-x-[420px]"
      style={style}
    >
      <div
        className="flex flex-row h-14 items-center px-4 border-b border-gray-300 border-b-2"
        onClick={() => dispatch(setSidebarSubItems(null))}
      >
        <>
          <IoIosArrowBack className="text-[20px]" />
          <span className="pl-2 font-bold">Main Menu</span>
        </>
      </div>
      <div className="font-bold px-6 py-4 text-lg">
        {sidebarSubItems?.label}
      </div>
      {sidebarSubItems?.items.map((item) => (
        <>
          <Link
            href={item.path}
            className="w-full menu-item relative py-2 px-6"
          >
            <span className="block w-full">{item.label}</span>
          </Link>
          {item.subMenu?.map((subItem) => (
            <MenuItem items={subItem.subMenu} text={subItem.label} />
          ))}
        </>
      ))}
      <div style={{ minHeight: "60px" }}></div>
    </div>
  );
}

function MenuItem({ text, items }) {
  const dispatch = useDispatch();

  const openRow = () => {
    const subItems = {
      label: text,
      items,
    };
    dispatch(setSidebarSubItems(subItems));
  };

  return (
    <div
      className="flex justify-between items-center w-full py-2 pl-6 pr-4"
      onClick={() => openRow()}
    >
      <div>{text}</div>
      <IoIosArrowForward />
    </div>
  );
}

export default function MobileMenuModern({ sidebarOpen }) {
  const dispatch = useDispatch();
  const { sidebarSubItems } = useSelector((state) => state.ui);

  function displayMenu(state) {
    const style = getAnimationStyle(state, "moveSideBar");

    return (
      <div className="flex flex-col w-full h-full" style={style}>
        <Transition
          in={sidebarSubItems === null}
          timeout={250}
          unmountOnExit
          mountOnEnter
        >
          {(state) => <Menu state={state} />}
        </Transition>
        <Transition
          in={sidebarSubItems !== null}
          timeout={250}
          unmountOnExit
          mountOnEnter
        >
          {(state) => <SubMenu state={state} />}
        </Transition>
      </div>
    );
  }

  return (
    <Transition in={sidebarOpen} timeout={250} mountOnEnter unmountOnExit>
      {(state) => {
        if (state === "exited") {
          dispatch(setSidebarSubItems(null));
        }
        return displayMenu(state);
      }}
    </Transition>
  );
}
