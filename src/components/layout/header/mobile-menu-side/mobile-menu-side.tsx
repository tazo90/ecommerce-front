import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { setDrawerView } from "@slices/ui.slice";
import { setCategories, setCategoryProducts } from "@slices/category.slice";
import { useCategoriesQuery } from "@framework/category/get-all-categories";
import { fadeInSide } from "@utils/motion/fade-in-side";
import { SubMenu } from "./sub-menu";
import { MenuIntro } from "./menu-intro";
import { Menu } from "./menu";

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
  const [activeMenu, setActiveMenu] = useState(0);

  // TODO: Move it to containers/categories-block
  const { data, isLoading, error } = useCategoriesQuery();

  useEffect(() => {
    return () => {
      setMenuItems([]);
      setActiveMenu(0);
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
        if (prevState >= 0 || prevState <= menus.length - 1) {
          return prevState + direction;
        }
        return activeMenu;
      });

      if (direction > 0) {
        // go to next menu
        if (menus[activeMenu].name === "MENU_INTRO") {
          setMenuItems([{ label: null, items: data?.categories }]);
        }

        if (menus[activeMenu].name !== "MENU_INTRO" && item && subItems) {
          const currentMenu = {
            label: item.name,
            items: subItems,
          };

          let stackedMenus;
          if (menuItems.length === 0) {
            stackedMenus = [currentMenu];
          } else {
            stackedMenus = [...menuItems];
            stackedMenus[activeMenu] = currentMenu;
          }

          setMenuItems(stackedMenus);
        }
      } else {
        // back to prev menu
        const stackedMenus = [...menuItems];
        stackedMenus.splice(activeMenu, 1);
        setMenuItems(stackedMenus);
      }
    },
    [menuItems]
  );

  return (
    <div className="flex flex-col w-full h-full relative overflow-x-hidden">
      <AnimatePresence exitBeforeEnter={false}>
        {menus.map(({ name, Component }, i) => (
          <motion.div
            className="w-full h-full absolute"
            key={name}
            variants={fadeInSide(0.5)}
            initial={activeMenu === i ? "left" : "right"}
            animate={
              activeMenu === i ? "animate" : i > activeMenu ? "right" : "left"
            }
          >
            <Component
              index={i}
              categories={data?.categories}
              menuItems={menuItems}
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
