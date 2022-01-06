import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import cn from "classnames";
import { useRouter } from "next/router";
import { setDrawerView } from "@slices/ui.slice";
import lowerCase from "lodash/lowerCase";
import { MenuItem } from "./menu-item";
import { MenuHeader } from "./menu-header";

export function SubMenu({
  index,
  menuItems,
  handleOpenMenu,
  handleBackMenu,
  handleCloseMenu,
}) {
  const router = useRouter();
  const dispatch = useDispatch();

  const { categoryProducts } = useSelector((state) => {
    return {
      categoryProducts: state.category.categoryProducts,
    };
  });

  function handleProductClick(product) {
    if (!product.price) return;

    dispatch(setDrawerView(null));

    const productSlug = lowerCase(product.name).replaceAll(" ", "-");
    router.push(`/products/${productSlug}-${product.id}`);
  }

  const menu = menuItems[index - 1];

  return (
    <div className="flex flex-col w-full h-full pb-6">
      <MenuHeader
        index={index}
        menuItems={menuItems}
        handleCloseMenu={handleCloseMenu}
        handleBackMenu={handleBackMenu}
      />
      {menu?.items?.map((item) => {
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
              handleOpenMenu={handleOpenMenu}
            />
          </div>
        );
      })}
    </div>
  );
}
