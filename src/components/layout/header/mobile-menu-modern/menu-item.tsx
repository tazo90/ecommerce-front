import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowForward } from "react-icons/io";
import { setSidebarSubItems } from "@slices/ui.slice";
import { capitalize } from "lodash";

export function MenuItem({ text, items, isProduct }) {
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
