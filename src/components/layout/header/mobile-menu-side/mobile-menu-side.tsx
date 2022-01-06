import React, { memo, useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setDrawerView } from "@slices/ui.slice";
import { setCategories, setCategoryProducts } from "@slices/category.slice";
import { useCategoriesQuery } from "@framework/category/get-all-categories";
import { SubMenu } from "./sub-menu";
import { MenuIntro } from "./menu-intro";
import { Menu } from "./menu";
import { AnimatePresence, motion } from "framer-motion";

const transition = {
  type: "tween",
  duration: 1,
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

const initial = {
  index: 0,
  curr: null,
  prev: null,
};

const MobileMenuSide = ({ sidebarOpen }) => {
  const dispatch = useDispatch();

  const [menuItems, setMenuItems] = useState<any>([]);
  const [activeMenu, setActiveMenu] = useState(initial);
  const [direction, setDirection] = useState(1);

  // TODO: Move it to containers/categories-block
  const { data, isLoading, error } = useCategoriesQuery();

  useEffect(() => {
    return () => {
      setMenuItems([]);
      setActiveMenu(initial);
    };
  }, [sidebarOpen]);

  useEffect(() => {
    dispatch(setCategories(data));
    dispatch(setCategoryProducts(data));
  }, [data]);

  function handleCloseMenu() {
    dispatch(setDrawerView(null));
  }

  const handleClick = useCallback(
    (direction, item, subItems) => {
      setActiveMenu((prevState) => {
        if (prevState.index >= 0 || prevState.index <= menus.length - 1) {
          const menuIndex = prevState.index + direction;
          return {
            index: menuIndex,
            curr: null,
            prev: null,
          };
        }
        return activeMenu;
      });

      setDirection(direction);

      // Set menus
      if (direction > 0) {
        if (menus[activeMenu.index].name === "MENU_INTRO") {
          setMenuItems([{ label: null, items: data?.categories }]);
        }

        if (menus[activeMenu.index].name !== "MENU_INTRO" && item && subItems) {
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

          setMenuItems(stackedMenus);
        }
      } else if (direction < 0) {
        // Remove last element
        const stackedMenus = [...menuItems];
        stackedMenus.splice(menuItems.length - 1, 1);
        setMenuItems(stackedMenus);
      }
    },
    [menuItems]
  );

  useEffect(() => {
    if (menuItems?.length >= 1) {
      setActiveMenu({
        index: activeMenu.index,
        curr: menuItems?.length >= 1 ? menuItems[activeMenu.index - 1] : null,
        prev: menuItems?.length >= 2 ? menuItems[activeMenu.index - 2] : null,
      });
    }
  }, [menuItems]);

  console.log("ACTIVE MENU", activeMenu);

  return (
    <div className="flex flex-col w-full h-full relative">
      <AnimatePresence exitBeforeEnter={false}>
        {menus.map(({ name, Component }, i) => (
          <motion.div
            className="w-full h-full absolute"
            key={name}
            variants={variants}
            initial={activeMenu.index === i ? "left" : "right"}
            animate={
              activeMenu.index === i
                ? "animate"
                : i > activeMenu.index
                ? "right"
                : "left"
            }
          >
            <Component
              categories={data?.categories}
              activeMenu={activeMenu}
              handleOpenMenu={handleClick}
              handleBackMenu={handleClick}
              handleCloseMenu={handleCloseMenu}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenuSide;
