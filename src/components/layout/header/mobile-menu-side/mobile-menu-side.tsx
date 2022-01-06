import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setDrawerView } from "@slices/ui.slice";
import { setCategories, setCategoryProducts } from "@slices/category.slice";
import { useCategoriesQuery } from "@framework/category/get-all-categories";
import { SubMenu } from "./sub-menu";
import { MenuIntro } from "./menu-intro";
import { Menu } from "./menu";
import { AnimatePresence, motion } from "framer-motion";

type MENU_VIEW = "MENU_INTRO" | "MENU" | "MENU_SUB_1" | "MENU_SUB_2" | null;

const MENUS = ["MENU_INTRO", "MENU", "MENU_SUB_1", "MENU_SUB_2"];

const transition = {
  type: "tween",
  duration: 0.4,
};

const variants = {
  left: { x: "-100%", transition },
  right: { x: "100%", transition },
  animate: {
    x: 0,
    transition,
  },
};

const menus = [
  {
    name: "MENU_INTRO",
    Component: MenuIntro,
  },
  {
    name: "MENU",
    Component: Menu,
  },
  {
    name: "MENU_SUB_1",
    Component: SubMenu,
  },
  {
    name: "MENU_SUB_2",
    Component: SubMenu,
  },
];

const MobileMenuSide = ({ sidebarOpen }) => {
  const dispatch = useDispatch();

  const [menuItems, setMenuItems] = useState<any>([]);
  const [menuView, setMenuView] = useState<MENU_VIEW>(null);
  const [activeMenu, setActiveMenu] = useState(0);
  const [direction, setDirection] = useState(1);

  // TODO: Move it to containers/categories-block
  const { data, isLoading, error } = useCategoriesQuery();

  let currentMenu = menuItems?.length >= 1 ? menuItems?.slice(-1)[0] : null;
  let previousMenu = menuItems?.length >= 2 ? menuItems?.slice(-2)[0] : null;

  useEffect(() => {
    if (sidebarOpen) {
      setMenuView("MENU_INTRO");
    }

    return () => {
      setMenuView(null);
      setMenuItems([]);
    };
  }, [sidebarOpen]);

  useEffect(() => {
    dispatch(setCategories(data));
    dispatch(setCategoryProducts(data));

    setMenuItems([{ label: null, items: data?.categories }]);
  }, [data]);

  function handleCloseMenu() {
    setMenuView(null);
    dispatch(setDrawerView(null));
  }

  const handleOpenMenu = useCallback(
    (item, subItems) => {
      const currentMenu = {
        label: item.name,
        items: subItems,
      };

      let stackedMenus;
      if (menuItems.length === 0) {
        stackedMenus = [currentMenu];
      } else {
        stackedMenus = [...menuItems];
        stackedMenus.push(currentMenu);
      }

      const view = `MENU_SUB_${stackedMenus.length - 1}`;

      // console.log("OPEN");

      setMenuItems(stackedMenus);
      setMenuView(view);
    },
    [menuView]
  );

  const handleBackMenu = useCallback(() => {
    const menuIndex = MENUS.findIndex((menuName) => menuName === menuView);
    const previousView = MENUS[menuIndex - 1];
    // Remove last element
    const stackedMenus = [...menuItems];
    stackedMenus.splice(menuItems.length - 1, 1);
    setMenuItems(stackedMenus);
    setMenuView(previousView);
  }, [menuView]);

  const handleClick = (direction) => {
    setActiveMenu((prevState) => {
      if (activeMenu >= 0 || activeMenu <= menus.length - 1) {
        return prevState + direction;

        // if (direction < 0) {
        //   // Remove last element
        //   const stackedMenus = [...menuItems];
        //   stackedMenus.splice(menuItems.length - 1, 1);
        //   setMenuItems(stackedMenus);
        // } else {
        //   console.log("MENU ITEMS", menuItems);
        // }
        // console.log("ACTIVATED", menuNum);

        // return prevState + direction;
      }
      return activeMenu;
    });

    setDirection(direction);
  };

  useEffect(() => {
    if (!data) return;

    if (activeMenu > 0) {
      if (direction > 0) {
      }
    }
    // if (direction < 0) {
    //   const menuIndex = MENUS.findIndex((menuName) => menuName === menuView);
    //   const previousView = MENUS[menuIndex - 1];
    //   // Remove last element
    //   const stackedMenus = [...menuItems];
    //   stackedMenus.splice(menuItems.length - 1, 1);
    //   setMenuItems(stackedMenus);
    //   setMenuView(previousView);
    // } else {}
  }, [data, activeMenu]);

  console.log("MENU ITEMS", menuItems);

  return (
    <div className="flex flex-col w-full h-full relative">
      <AnimatePresence exitBeforeEnter={false}>
        {menus.map(({ name, Component }, i) => (
          <motion.div
            className="w-full h-full absolute"
            key={name}
            variants={variants}
            initial={activeMenu === i ? "left" : "right"}
            animate={
              activeMenu === i ? "animate" : i > activeMenu ? "right" : "left"
            }
          >
            <Component
              categories={data?.categories}
              currentMenu={currentMenu}
              previousMenu={previousMenu}
              handleOpenMenu={() => handleClick(1)}
              handleBackMenu={() => handleClick(-1)}
              handleCloseMenu={handleCloseMenu}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenuSide;
