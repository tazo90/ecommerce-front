import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { Transition } from "react-transition-group";
import Logo from "@components/ui/logo";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { setDrawerView, setSidebarSubItems } from "@slices/ui.slice";
import { setCategoryProducts } from "@slices/category.slice";
import { useCategoriesQuery } from "@framework/category/get-all-categories";
import { capitalize } from "lodash";

function getAnimationStyle(state: string, cssAnimatinoClass: string) {
  if (state === "entering") {
    return { animation: `${cssAnimatinoClass} .25s forwards` };
  } else if (state === "entered") {
    return { transform: "translateX(0)" };
  }
  return { animation: `${cssAnimatinoClass} .15s reverse backwards` };
}

function Menu({ state, categories }) {
  const dispatch = useDispatch();
  let style;

  if (state === "exiting") {
    style = { animation: "moveMenu .25s forwards" };
  } else if (state === "entering") {
    style = { animation: "moveMenu .25s reverse backwards" };
  }

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

      {categories?.map((category) => {
        const categoryItems =
          category.subCategories || Object.values(category.products);

        return (
          <div className="flex items-center pl-4" key={category.id}>
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
              items={categoryItems}
            />
          </div>
        );
      })}
    </div>
  );
}

function SubMenu({ state }) {
  const dispatch = useDispatch();
  const { sidebarSubItems, categoryProducts } = useSelector((state) => {
    return {
      sidebarSubItems: state.ui.sidebarSubItems,
      categoryProducts: state.category.categoryProducts,
    };
  });

  const style = getAnimationStyle(state, "moveSubMenu");
  const currentMenu = sidebarSubItems?.slice(-1)[0];
  const previousMenu =
    sidebarSubItems?.length > 1 ? sidebarSubItems?.slice(-2)[0] : null;

  function handleMenuBack() {
    dispatch(setSidebarSubItems(previousMenu ? [previousMenu] : null));
  }

  console.log("CURR MENU", currentMenu);

  return (
    <div
      className="flex flex-col absolute w-full h-full overflow-y-scroll translate-x-[420px]"
      style={style}
    >
      <div
        className="flex flex-row h-16 items-center px-4 border-b border-gray-300 border-b-2"
        onClick={() => handleMenuBack()}
      >
        <>
          <IoIosArrowBack className="text-[20px]" />
          <span className="pl-2 font-bold">
            {previousMenu?.label || "Main Menu"}
          </span>
        </>
      </div>
      <div className="font-bold px-6 py-4 text-lg">{currentMenu?.label}</div>
      {currentMenu?.items.map((item) => {
        return (
          <div className="flex items-center pl-4" key={item.id}>
            <Image
              src={item.img ?? item.media[1].url}
              width={70}
              height={70}
              quality={100}
              className="object-cover"
            />
            <MenuItem
              key={item.id}
              text={item.name}
              items={categoryProducts[item.id]}
            />
          </div>
        );
      })}
    </div>
  );
}

function MenuItem({ text, items }) {
  const dispatch = useDispatch();
  const { sidebarSubItems } = useSelector((state) => state.ui);

  const openRow = () => {
    const currentMenu = {
      label: text,
      items,
    };

    let stackedMenus;
    if (sidebarSubItems === null) {
      stackedMenus = [currentMenu];
    } else {
      stackedMenus = [...sidebarSubItems];
      stackedMenus.push(currentMenu);
    }

    dispatch(setSidebarSubItems(stackedMenus));
  };

  return (
    <div
      className="flex justify-between items-center w-full py-5 pl-6 pr-4"
      onClick={() => openRow()}
    >
      <div className="text-sm font-semibold">{capitalize(text)}</div>
      <IoIosArrowForward />
    </div>
  );
}

export default function MobileMenuModern({ sidebarOpen }) {
  const dispatch = useDispatch();
  const { sidebarSubItems } = useSelector((state) => state.ui);

  // TODO: Move it to containers/categories-block
  const { data, isLoading, error } = useCategoriesQuery();

  useEffect(() => {
    const categoryProducts = {};
    data?.categories.map((category) => {
      Object.values(category.products).map((product) => {
        product.subCategoryId?.map((categoryId) => {
          if (categoryProducts.hasOwnProperty(categoryId)) {
            categoryProducts[categoryId].push(product);
          } else {
            categoryProducts[categoryId] = [product];
          }
        });
      });
    });

    dispatch(setCategoryProducts(categoryProducts));
  }, [data]);

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
          {(state) => <Menu state={state} categories={data?.categories} />}
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
