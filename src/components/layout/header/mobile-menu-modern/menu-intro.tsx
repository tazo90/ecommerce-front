import React from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Link from "@components/ui/link";
import { setMenuView } from "@slices/ui.slice";
import { MenuHeader } from "./menu-header";

export function MenuIntro({ state }) {
  const dispatch = useDispatch();

  const menuIntro = [
    {
      name: "MENU",
      img: "/assets/images/menu/menu.png",
      url: "/products",
      onClick: () => {
        dispatch(
          setMenuView({
            view: "MENU",
            action: "GO",
          })
        );
      },
    },
    {
      name: "KUPONY",
      img: "/assets/images/menu/deal.png",
      url: "/cupons",
    },
    {
      name: "ZNAJDŹ KFC",
      img: "/assets/images/menu/find-kfc.png",
      url: "/find-kfc",
    },
    {
      name: "PRACA",
      img: "/assets/images/menu/deal.png",
      url: "/jobs",
    },
    {
      name: "O KFC",
      img: "/assets/images/menu/about-kfc.png",
      url: "/about-kfc",
    },
  ];

  const transitionStyles: any = {
    exiting: { animation: "moveIntro .25s forwards" },
    entering: { animation: "moveIntro .25s reverse backwards" },
    exited: { transform: "translateX(-420px)" },
  };

  const boxClasses =
    "flex items-center justify-between my-3 mx-4 px-4 h-80 bg-gray-200 rounded-lg font-medium text-sm";

  return (
    <div
      className="flex flex-col justify-between w-full h-full overflow-y-scroll"
      style={transitionStyles[state]}
    >
      <MenuHeader withBack={false} />

      {menuIntro.map((item) => {
        const content = (
          <>
            {item.name}
            <Image
              src={item.img}
              alt={item.name}
              width={140}
              height={120}
              priority
              className="object-cover"
            />
          </>
        );

        if (item.onClick) {
          return (
            <div onClick={item.onClick} className={boxClasses}>
              {content}
            </div>
          );
        }

        return (
          <Link href={item.url} className={boxClasses}>
            {content}
          </Link>
        );
      })}
    </div>
  );
}
