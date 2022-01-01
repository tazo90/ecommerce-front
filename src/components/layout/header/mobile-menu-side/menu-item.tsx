import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import capitalize from "lodash/capitalize";

export function MenuItem({
  item,
  subItems,
  isProduct,
  handleOpenMenu,
  capitalizeTitle = false,
}) {
  const name = capitalizeTitle ? capitalize(item.name) : item.name;

  return (
    <div
      className={`flex justify-between items-center w-full ${
        isProduct ? "pl-4 pr-2" : "pr-4 pl-6"
      }`}
      onClick={() => handleOpenMenu(item, subItems)}
    >
      {isProduct ? (
        <div className="flex flex-col justify-between w-full h-full">
          <div className="text-md font-medium leading-tight">{name}</div>
          <div className="pt-1 text-[0.8rem] line-clamp-2">
            {item.plainDescription}
          </div>
          <div className="pt-1 text-md font-semibold">{item.price} zł</div>
        </div>
      ) : (
        <>
          <div className="text-sm font-semibold">{name}</div>
          <IoIosArrowForward />
        </>
      )}
    </div>
  );
}
