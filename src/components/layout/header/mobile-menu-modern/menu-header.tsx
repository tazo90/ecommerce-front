import React from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Logo from "@components/ui/logo";
import { IoIosArrowBack } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { setDrawerView, setMenuView } from "@slices/ui.slice";

export function MenuHeader({ withBack = true, showDelivery = false }) {
  const dispatch = useDispatch();

  function handleCloseMenu() {
    dispatch(setMenuView(false));
    dispatch(setDrawerView(null));
  }

  function handleMenuBack() {
    dispatch(setMenuView({ view: "MENU_INTRO", action: "BACK" }));
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
