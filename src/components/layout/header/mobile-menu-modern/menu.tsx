import React from "react";
import Image from "next/image";
import { MenuHeader } from "./menu-header";
import { MenuItem } from "./menu-item";

export function Menu({ state, categories, menuView }) {
  const translateX = "420px";
  const enteringClass = menuView?.action === "GO" ? "moveMenu" : "moveMenuBack";
  const exitingClass = menuView?.action === "GO" ? "moveMenuBack" : "moveMenu";

  const transitionStyles: any = {
    entering: { animation: `${enteringClass} .25s forwards` },
    entered: { transform: "translateX(0)" },
    exiting: { animation: `${exitingClass} .25s reverse backwards` },
    exited: { transform: `translateX(${translateX})` },
  };

  return (
    <div
      className={`flex flex-col absolute w-full h-full overflow-y-scroll translate-x-[${translateX}]`}
      style={transitionStyles[state]}
    >
      <MenuHeader />

      {categories?.map((category) => {
        const categoryItems =
          category.subCategories || Object.values(category.products);

        return (
          <div className="flex items-center pl-4 py-0.5" key={category.id}>
            <Image
              src={category.img}
              alt={category.name}
              width={80}
              height={80}
              quality={100}
              priority
              className="object-cover"
            />
            <MenuItem
              key={category.id}
              item={category}
              subItems={categoryItems}
              isProduct={false}
              capitalizeTitle={true}
            />
          </div>
        );
      })}
    </div>
  );
}
