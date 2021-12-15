import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Transition } from "react-transition-group";
import Image from "next/image";
import Link from "@components/ui/link";
import Logo from "@components/ui/logo";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { setDrawerView, setSidebarSubItems } from "@slices/ui.slice";
import { siteSettings } from "@settings/site.settings";
import { useCategoriesQuery } from "@framework/category/get-all-categories";

function getAnimationStyle(state: string, cssAnimatinoClass: string) {
  if (state === "entering") {
    return { animation: `${cssAnimatinoClass} .25s forwards` };
  } else if (state === "entered") {
    return { transform: "translateX(0)" };
  }
  return { animation: `${cssAnimatinoClass} .15s reverse backwards` };
}

function Menu({ state }) {
  const dispatch = useDispatch();
  let style;

  if (state === "exiting") {
    style = { animation: "moveMenu .25s forwards" };
  } else if (state === "entering") {
    style = { animation: "moveMenu .25s reverse backwards" };
  }

  // TODO: Move it to containers/categories-block
  const { data, isLoading, error } = useCategoriesQuery({
    limit: 8,
  });

  console.log("DATA", data?.categories);

  function handleCloseMenu() {
    dispatch(setDrawerView(null));
  }

  function displayHeader() {
    return (
      <div className="w-full h-14 border-b border-gray-300 border-b-2 flex justify-between items-center relative flex-shrink-0 pl-4">
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

      <div className="flex items-center justify-between px-2 py-2 border-b border-gray-300 border-b-2">
        <div className="flex border-r border-gray-300 border-r-2 pr-2">
          <Image
            src="https://kfc.pl/assets/img/menu/motor.png"
            width={30}
            height={30}
            quality={100}
            className="object-cover"
          />
          <span>Dostawa</span>
          <Image
            src="https://kfc.pl/assets/img/menu/clock30.svg"
            width={30}
            height={30}
            quality={100}
            className="object-cover"
          />
        </div>
        <div className="flex pl-2 pr-2">
          <Image
            src="https://kfc.pl/assets/img/menu/hand.png"
            width={30}
            height={30}
            quality={100}
            className="object-cover"
          />
          <span>Restauracja</span>
          <Image
            src="https://kfc.pl/assets/img/menu/clock5.svg"
            width={30}
            height={30}
            quality={100}
            className="object-cover"
          />
        </div>
      </div>

      {data?.categories?.map((category) => {
        return (
          <div className="flex items-center pl-4">
            <Image
              src={category.img}
              width={70}
              height={70}
              quality={100}
              className="object-cover"
            />
            <MenuItem
              key={category.id}
              text={category.name}
              items={category.subCategories}
            />
          </div>
        );
      })}

      {/* {data?.categories?.map((category) => (
        <div key={category.id}>
          <div className="flex items-center">
            <div className="font-bold px-6 pt-2 text-lg">{category.name}</div>
            <Image
              src={category.img}
              width={50}
              height={50}
              quality={100}
              className="object-cover"
            />
          </div>
          {category.subCategories?.map((subCategory) => {
            if (subCategory) {
              return (
                <MenuItem
                  key={subCategory.id}
                  text={subCategory.name}
                  items={category.subCategories}
                />
              );
            }
            return (
              <Link href="/" className="w-full">
                <span className="py-2 px-6 block w-full">
                  {subCategory.name}
                </span>
              </Link>
            );
          })}
        </div>
      ))} */}
    </div>
  );
}

function SubMenu({ state }) {
  const dispatch = useDispatch();
  const { sidebarSubItems } = useSelector((state) => state.ui);
  const style = getAnimationStyle(state, "moveSubMenu");

  console.log("SUB", sidebarSubItems);

  return (
    <div
      className="flex flex-col absolute w-full h-full overflow-y-scroll translate-x-[420px]"
      style={style}
    >
      <div
        className="flex flex-row h-16 items-center px-4 border-b border-gray-300 border-b-2"
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
        <div className="flex items-center pl-4">
          <Image
            src={item.media[1].url}
            width={70}
            height={70}
            quality={100}
            className="object-cover"
          />
          <MenuItem key={item.id} text={item.name} items={[]} />
        </div>
      ))}
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
      className="flex justify-between items-center w-full py-5 pl-6 pr-4"
      onClick={() => openRow()}
    >
      <div className="uppercase text-sm font-semibold">{text}</div>
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
