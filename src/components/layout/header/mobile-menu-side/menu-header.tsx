import React from "react";
import Image from "next/image";
import Logo from "@components/ui/logo";
import { IoIosArrowBack } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import capitalize from "lodash/capitalize";

export function MenuHeader({
  index,
  menuItems,
  handleCloseMenu,
  handleBackMenu,
  showDelivery = false,
}) {
  const currentMenu = menuItems && menuItems[index - 1];
  const previousMenu = menuItems?.length >= 2 ? menuItems[index - 2] : null;

  return (
    <>
      <div className="w-full h-12 border-gray-300 border-b-2 flex justify-between items-center relative flex-shrink-0 overflow-hidden">
        {handleBackMenu && (
          <div
            className="flex items-center px-4 py-4 h-14 border-gray-300 border-b-2"
            onClick={() => handleBackMenu(-1)}
          >
            <>
              <IoIosArrowBack className="text-[20px]" />
              {previousMenu && (
                <span className="pl-2 font-bold">
                  {capitalize(previousMenu.label) || "Main Menu"}
                </span>
              )}
            </>
          </div>
        )}

        {!previousMenu && <Logo className="pl-4" />}

        <button
          className="flex text-2xl items-center justify-center text-gray-500 px-4 md:px-5 py-6 lg:py-8 focus:outline-none transition-opacity hover:opacity-60"
          onClick={() => handleCloseMenu()}
          aria-label="close"
        >
          <IoClose className="text-black mt-1 md:mt-0.5" />
        </button>
      </div>

      {previousMenu && (
        <div className="uppercase font-bold px-6 pt-4 pb-2 text-lg">
          {currentMenu?.label}
        </div>
      )}

      {showDelivery && (
        <div className="flex items-center justify-center w-full py-2 border-gray-300 border-b-2 font-medium bg-green">
          <div className="flex justify-center w-1/2 border-gray-300 border-r-2">
            <span className="pr-1">Delivery</span>
            <Image
              src="https://kfc.pl/assets/img/menu/clock30.svg"
              width={30}
              height={30}
              quality={100}
              className="object-cover"
            />
          </div>
          <div className="flex justify-center w-1/2">
            <span className="pr-1">Pick Up</span>
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
