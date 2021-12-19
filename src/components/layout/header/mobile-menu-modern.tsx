import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/router";
import { Transition } from "react-transition-group";
import Logo from "@components/ui/logo";
import Link from "@components/ui/link";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import {
  setDrawerView,
  setSidebarSubItems,
  setMenuView,
} from "@slices/ui.slice";
import { setCategoryProducts } from "@slices/category.slice";
import { setCurrentProduct } from "@slices/product.slice";
import { useCategoriesQuery } from "@framework/category/get-all-categories";
import { capitalize, lowerCase } from "lodash";

function getAnimationStyle(state: string, cssAnimatinoClass: string) {
  if (state === "entering") {
    return { animation: `${cssAnimatinoClass} .25s forwards` };
  } else if (state === "entered") {
    return { transform: "translateX(0)" };
  }
  return { animation: `${cssAnimatinoClass} .15s reverse backwards` };
}

function MenuHeader({ withBack = true, showDelivery = false }) {
  const dispatch = useDispatch();

  function handleCloseMenu() {
    dispatch(setMenuView(false));
    dispatch(setDrawerView(null));
  }

  function handleMenuBack() {
    dispatch(setMenuView(false));
  }

  return (
    <>
      <div className="w-full h-14 border-gray-300 border-b-2 flex justify-between items-center relative flex-shrink-0 pl-4">
        {withBack && (
          <div
            className="flex flex-row h-16 items-center px-4"
            onClick={() => handleMenuBack()}
          >
            <>
              <IoIosArrowBack className="text-[20px]" />
              <span className="pl-2 font-bold"></span>
            </>
          </div>
        )}

        <Logo />

        <button
          className="flex text-2xl items-center justify-center text-gray-500 px-4 md:px-5 py-6 lg:py-8 focus:outline-none transition-opacity hover:opacity-60"
          onClick={() => handleCloseMenu()}
          aria-label="close"
        >
          <IoClose className="text-black mt-1 md:mt-0.5" />
        </button>
      </div>

      {showDelivery && (
        <div className="flex items-center justify-between px-2 py-2 border-gray-300 border-b-2">
          <div className="flex border-gray-300 border-r-2 pr-2">
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
      )}
    </>
  );
}

function Menu({ state, categories }) {
  let style;

  if (state === "exiting") {
    style = { animation: "moveMenu .25s forwards" };
  } else if (state === "entering") {
    style = { animation: "moveMenu .25s reverse backwards" };
  }
  // const style = getAnimationStyle(state, "moveSubMenu");

  return (
    <div
      className="flex flex-col absolute w-full h-full overflow-y-scroll"
      style={style}
    >
      <MenuHeader />

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
              isProduct={false}
            />
          </div>
        );
      })}
    </div>
  );
}

function SubMenu({ state }) {
  const router = useRouter();
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

  function handleProductClick(product) {
    if (!product.price) return;

    dispatch(setCurrentProduct(product));

    const productSlug = lowerCase(product.name).replaceAll(" ", "-");
    router.push(`/order/${productSlug}-${product.id}`);
  }

  return (
    <div
      className="flex flex-col absolute w-full h-full overflow-y-scroll translate-x-[420px]"
      style={style}
    >
      <div
        className="flex flex-row h-16 items-center px-4 border-gray-300 border-b-2"
        onClick={() => handleMenuBack()}
      >
        <>
          <IoIosArrowBack className="text-[20px]" />
          <span className="pl-2 font-bold">
            {capitalize(previousMenu?.label) || "Main Menu"}
          </span>
        </>
      </div>
      <div className="uppercase font-bold px-6 py-4 text-lg">
        {currentMenu?.label}
      </div>

      {currentMenu?.items?.map((item) => {
        const isProduct = item.price !== undefined;

        return (
          <div
            className="flex items-center pl-4"
            onClick={() => handleProductClick(item)}
            key={item.id}
          >
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
              isProduct={isProduct}
            />
          </div>
        );
      })}
    </div>
  );
}

function MenuItem({ text, items, isProduct }) {
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
      {!isProduct && <IoIosArrowForward />}
    </div>
  );
}

function MenuIntro({ state }) {
  const dispatch = useDispatch();

  const menuIntro = [
    {
      name: "MENU",
      img: "/assets/images/menu/menu.png",
      url: "/order",
      onClick: () => {
        dispatch(setMenuView(true));
      },
    },
    {
      name: "KUPONY",
      img: "/assets/images/menu/deal.png",
      url: "/cupons",
    },
    {
      name: "ZNAJDŹ KFC",
      img: "/assets/images/menu/find-kfc.png",
      url: "/find-kfc",
    },
    {
      name: "PRACA",
      img: "/assets/images/menu/deal.png",
      url: "/jobs",
    },
    {
      name: "O KFC",
      img: "/assets/images/menu/about-kfc.png",
      url: "/about-kfc",
    },
  ];

  // const style = getAnimationStyle(state, "moveIntro");
  let style;

  if (state === "exiting") {
    style = { animation: "moveIntro .25s reverse backwards" };
  } else if (state === "entering") {
    style = { animation: "moveIntro .25s forwards" };
  }

  const boxClasses =
    "flex items-center justify-between my-3 mx-4 px-4 h-30 bg-gray-200 font-medium text-sm";

  return (
    <div
      className="flex flex-col justify-between w-full h-full overflow-y-scroll"
      style={style}
    >
      <MenuHeader withBack={false} />

      {menuIntro.map((item) => {
        const content = (
          <>
            {item.name}
            <Image
              src={item.img}
              width={120}
              height={100}
              className="object-cover"
            />
          </>
        );

        if (item.onClick) {
          return (
            <div onClick={item.onClick} className={boxClasses}>
              {content}
            </div>
          );
        }

        return (
          <Link href={item.url} className={boxClasses}>
            {content}
          </Link>
        );
      })}
    </div>
  );
}

export default function MobileMenuModern({ sidebarOpen }) {
  const dispatch = useDispatch();
  const { sidebarSubItems, displayMenu } = useSelector((state) => state.ui);

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

  function SidebarMenu(state) {
    const style = getAnimationStyle(state, "moveSideBar");

    return (
      <div className="flex flex-col w-full h-full" style={style}>
        <Transition in={!displayMenu} timeout={250} unmountOnExit mountOnEnter>
          {(state) => <MenuIntro state={state} />}
        </Transition>
        <Transition
          in={displayMenu && sidebarSubItems === null}
          timeout={250}
          unmountOnExit
          mountOnEnter
        >
          {(state) => <Menu state={state} categories={data?.categories} />}
        </Transition>
        <Transition
          in={displayMenu && sidebarSubItems !== null}
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
        return SidebarMenu(state);
      }}
      {/* <MenuIntro /> */}
    </Transition>
  );
}
