import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setDrawerView } from "@slices/ui.slice";
import { setCategories, setCategoryProducts } from "@slices/category.slice";
import { useCategoriesQuery } from "@framework/category/get-all-categories";
import { SubMenu } from "./sub-menu";
import { MenuIntro } from "./menu-intro";
import { Menu } from "./menu";
import { AnimatePresence, motion } from "framer-motion";

type MENU_VIEW = {
  view: "MENU_INTRO" | "MENU" | "MENU_SUB_1" | "MENU_SUB_2" | null;
  action: "GO" | "BACK" | null;
} | null;

const MENUS = ["MENU_INTRO", "MENU", "MENU_SUB_1", "MENU_SUB_2"];

const variant = {
  show: {
    x: 0,
    transition: {
      type: "tween",
      duration: 0.4,
    },
  },
  hidden: {
    x: "-100%",
    transition: {
      type: "tween",
      duration: 0.4,
    },
  },
  hiddenRight: {
    x: "100%",
    transition: {
      type: "tween",
      duration: 0.4,
    },
  },
};

export default function MobileMenuSide({ sidebarOpen }) {
  const dispatch = useDispatch();

  const [menuItems, setMenuItems] = useState<any>([]);
  const [menuView, setMenuView] = useState<MENU_VIEW>(null);

  // TODO: Move it to containers/categories-block
  const { data, isLoading, error } = useCategoriesQuery();

  let currentMenu = menuItems?.length >= 1 ? menuItems?.slice(-1)[0] : null;
  let previousMenu = menuItems?.length >= 2 ? menuItems?.slice(-2)[0] : null;

  useEffect(() => {
    if (sidebarOpen) {
      setMenuView({
        view: "MENU_INTRO",
        action: "GO",
      });
    }

    return () => {
      setMenuView(null);
      setMenuItems([]);
    };
  }, [sidebarOpen]);

  useEffect(() => {
    dispatch(setCategories(data));
    dispatch(setCategoryProducts(data));
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

      setMenuItems(stackedMenus);
      setMenuView({ view: view, action: "GO" });
    },
    [menuItems]
  );

  const handleBackMenu = useCallback(() => {
    const menuIndex = MENUS.findIndex(
      (menuName) => menuName === menuView?.view
    );
    const previousView = MENUS[menuIndex - 1];

    // Remove last element
    const stackedMenus = [...menuItems];
    stackedMenus.splice(menuItems.length - 1, 1);

    setMenuItems(stackedMenus);
    setMenuView({ view: previousView, action: "BACK" });
  }, [menuView]);

  const action = menuView?.action;

  return (
    <div className="flex flex-col w-full h-full relative">
      <AnimatePresence exitBeforeEnter={false}>
        {menuView?.view === "MENU_INTRO" && (
          <motion.div
            layout
            key="menu_intro"
            variants={variant}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            <MenuIntro
              handleCloseMenu={handleCloseMenu}
              handleMenuClick={() => {
                setMenuView({
                  view: "MENU",
                  action: "GO",
                });

                setMenuItems([{ label: null, items: data?.categories }]);
              }}
            />
          </motion.div>
        )}

        {menuView?.view === "MENU" && (
          <motion.div
            layout
            key="menu"
            variants={variant}
            initial={action === "GO" ? "hiddenRight" : "hidden"}
            animate="show"
            exit={action === "GO" ? "hidden" : "hiddenRight"}
          >
            <Menu
              categories={data?.categories}
              currentMenu={currentMenu}
              previousMenu={previousMenu}
              handleOpenMenu={handleOpenMenu}
              handleBackMenu={handleBackMenu}
              handleCloseMenu={handleCloseMenu}
            />
          </motion.div>
        )}

        {menuView?.view === "MENU_SUB_1" && (
          <motion.div
            layout
            key="menu_sub_1"
            variants={variant}
            initial={action === "GO" ? "hiddenRight" : "hidden"}
            animate="show"
            exit={action === "GO" ? "hidden" : "hiddenRight"}
          >
            <SubMenu
              handleOpenMenu={handleOpenMenu}
              handleBackMenu={handleBackMenu}
              handleCloseMenu={handleCloseMenu}
              currentMenu={currentMenu}
              previousMenu={previousMenu}
            />
          </motion.div>
        )}

        {menuView?.view === "MENU_SUB_2" && (
          <motion.div
            key="menu_sub_2"
            variants={variant}
            initial={action === "GO" ? "hiddenRight" : "hidden"}
            animate="show"
            exit="hiddenRight"
          >
            <SubMenu
              handleOpenMenu={handleOpenMenu}
              handleBackMenu={handleBackMenu}
              handleCloseMenu={handleCloseMenu}
              currentMenu={currentMenu}
              previousMenu={previousMenu}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
