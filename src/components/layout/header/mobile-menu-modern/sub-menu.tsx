import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import cn from "classnames";
import { useRouter } from "next/router";
import { IoIosArrowBack } from "react-icons/io";
import {
  setSidebarSubItems,
  setMenuView,
  setDrawerView,
} from "@slices/ui.slice";
import { setCurrentProduct } from "@slices/product.slice";
import capitalize from "lodash/capitalize";
import lowerCase from "lodash/lowerCase";
import { MenuItem } from "./menu-item";

export function SubMenu() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { sidebarSubItems, categoryProducts } = useSelector((state) => {
    return {
      sidebarSubItems: state.ui.sidebarSubItems,
      categoryProducts: state.category.categoryProducts,
    };
  });

  const currentMenu = sidebarSubItems?.slice(-1)[0];
  const previousMenu =
    sidebarSubItems?.length > 1 ? sidebarSubItems?.slice(-2)[0] : null;

  const handleMenuBack = useCallback(() => {
    let previousView = "MENU";
    let previousSidebarItems = null;

    if (previousMenu) {
      previousView = "MENU_SUB_1";
      previousSidebarItems = [previousMenu];
    }

    console.log("BACK");

    dispatch(setSidebarSubItems(previousSidebarItems));
    dispatch(setMenuView({ view: previousView, action: "BACK" }));
  }, [previousMenu]);

  function handleProductClick(product) {
    if (!product.price) return;

    dispatch(setCurrentProduct(product));
    dispatch(setDrawerView(null));

    const productSlug = lowerCase(product.name).replaceAll(" ", "-");
    router.push(`/products/${productSlug}-${product.id}`);
  }

  return (
    <div className="flex flex-col absolute w-full h-full pb-6">
      <div
        className="flex items-center px-4 py-4 h-14 border-gray-300 border-b-2"
        onClick={() => handleMenuBack()}
      >
        <>
          <IoIosArrowBack className="text-[20px]" />
          <span className="pl-2 font-bold">
            {capitalize(previousMenu?.label) || "Main Menu"}
          </span>
        </>
      </div>
      <div className="uppercase font-bold px-6 pt-4 pb-2 text-lg">
        {currentMenu?.label}
      </div>

      {currentMenu?.items?.map((item) => {
        const isProduct = item.price !== undefined;

        return (
          <div
            className={cn("flex pl-3", {
              "py-1 max-h-34 m-2 rounded-lg bg-gray-150": isProduct,
              "py-0.5": !isProduct,
            })}
            onClick={() => handleProductClick(item)}
            key={item.id}
          >
            <Image
              src={item.img ?? item.media[0].url}
              alt={item.name}
              width={120}
              height={120}
              quality={100}
              priority
              className="object-contain"
            />
            <MenuItem
              key={item.id}
              item={item}
              subItems={categoryProducts[item.id]}
              isProduct={isProduct}
            />
          </div>
        );
      })}
    </div>
  );
}
