import React from "react";
import Image from "next/image";
import { MenuHeader } from "./menu-header";
import { MenuItem } from "./menu-item";

export function Menu({
  categories,
  currentMenu,
  previousMenu,
  handleOpenMenu,
  handleBackMenu,
  handleCloseMenu,
}) {
  return (
    <div className="flex flex-col absolute w-full h-full">
      <MenuHeader
        currentMenu={currentMenu}
        previousMenu={previousMenu}
        handleCloseMenu={handleCloseMenu}
        handleBackMenu={handleBackMenu}
      />

      {categories?.map((category) => {
        const categoryItems =
          category.subCategories || Object.values(category.products);

        return (
          <div className="flex items-center pl-4 py-0.5" key={category.id}>
            {category.img && (
              <Image
                src={category.img}
                alt={category.name}
                width={80}
                height={80}
                quality={100}
                priority
                className="object-cover"
              />
            )}
            <MenuItem
              key={category.id}
              item={category}
              subItems={categoryItems}
              isProduct={false}
              capitalizeTitle={true}
              handleOpenMenu={handleOpenMenu}
            />
          </div>
        );
      })}
    </div>
  );
}
