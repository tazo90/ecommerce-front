import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowForward } from "react-icons/io";
import { setSidebarSubItems, setMenuView } from "@slices/ui.slice";
import { capitalize } from "lodash";

export function MenuItem({
  item,
  subItems,
  isProduct,
  capitalizeTitle = false,
}) {
  const dispatch = useDispatch();
  const { sidebarSubItems } = useSelector((state) => state.ui);

  const name = capitalizeTitle ? capitalize(item.name) : item.name;

  function openRow() {
    const currentMenu = {
      label: item.name,
      items: subItems,
    };

    let stackedMenus;
    if (sidebarSubItems === null) {
      stackedMenus = [currentMenu];
    } else {
      stackedMenus = [...sidebarSubItems];
      stackedMenus.push(currentMenu);
    }

    dispatch(setSidebarSubItems(stackedMenus));
    dispatch(setMenuView({ view: "MENU_SUB_1", action: "GO" }));
  }

  return (
    <div
      className={`flex justify-between items-center w-full ${
        isProduct ? "pl-4 pr-2" : "pr-4 pl-6"
      }`}
      onClick={() => openRow()}
    >
      {isProduct ? (
        <div className="flex flex-col justify-between w-full h-full">
          <div className="text-md font-medium leading-tight">{name}</div>
          <div className="pt-1 text-[0.8rem] line-clamp-2">
            {item.plainDescription}
          </div>
          <div className="pt-1 text-md font-semibold">{item.price}</div>
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
