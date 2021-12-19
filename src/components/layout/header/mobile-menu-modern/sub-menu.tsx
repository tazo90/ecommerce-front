import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/router";
import { IoIosArrowBack } from "react-icons/io";
import { setSidebarSubItems } from "@slices/ui.slice";
import { setCurrentProduct } from "@slices/product.slice";
import { capitalize, lowerCase } from "lodash";
import { MenuItem } from "./menu-item";

function getAnimationStyle(state: string, cssAnimatinoClass: string) {
  if (state === "entering") {
    return { animation: `${cssAnimatinoClass} .25s forwards` };
  } else if (state === "entered") {
    return { transform: "translateX(0)" };
  }
  return { animation: `${cssAnimatinoClass} .15s reverse backwards` };
}

export function SubMenu({ state }) {
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
