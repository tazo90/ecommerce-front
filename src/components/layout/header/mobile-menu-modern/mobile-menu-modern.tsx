import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMenuView, setSidebarSubItems } from "@slices/ui.slice";
import { setCategories, setCategoryProducts } from "@slices/category.slice";
import { useCategoriesQuery } from "@framework/category/get-all-categories";
import { SubMenu } from "./sub-menu";
import { MenuIntro } from "./menu-intro";
import { Menu } from "./menu";
import { AnimatePresence, motion } from "framer-motion";

export default function MobileMenuModern({ sidebarOpen }) {
  const dispatch = useDispatch();
  const { menuView } = useSelector((state) => state.ui);

  // TODO: Move it to containers/categories-block
  const { data, isLoading, error } = useCategoriesQuery();

  useEffect(() => {
    if (sidebarOpen) {
      dispatch(
        setMenuView({
          view: "MENU_INTRO",
          action: "GO",
        })
      );
      console.log("INIT");
    }

    return () => {
      console.log("CLOSE");
      dispatch(setMenuView(null));
      dispatch(setSidebarSubItems(null));
    };
  }, [sidebarOpen]);

  useEffect(() => {
    dispatch(setCategories(data));
    dispatch(setCategoryProducts(data));
  }, [data]);

  const action = menuView?.action;

  const tabVariant = {
    active: {
      x: 0,
      transition: {
        type: "tween",
        duration: 0.4,
      },
    },
    inactive: {
      x: "-100%",
      transition: {
        type: "tween",
        duration: 0.4,
      },
    },
    inactiveRight: {
      x: "100%",
      transition: {
        type: "tween",
        duration: 0.4,
      },
    },
  };

  const getExitAnimation = useCallback(
    (menuView) => {
      console.log("ACTION", menuView);

      if (menuView?.action === "GO" && menuView?.view === "MENU_INTRO") {
        return "inactive";
      }
      if (menuView?.action === "GO") {
        return "inactiveRight";
      }

      if (menuView?.action === "BACK") {
        return "inactiveRight";
      }

      return "inactive";
    },
    [menuView]
  );

  let exit = "inactive";
  console.log("MOB", menuView, action);
  if (menuView?.view === "MENU_INTRO") {
    console.log("1");
    exit = "inactive";
  } else if (menuView?.view === "MENU") {
    console.log("2");
    exit = "inactiveRight";
  } else {
    exit = "inactive";
  }
  console.log("EXIT", exit);

  return (
    <div className="flex flex-col w-full h-full relative">
      <AnimatePresence exitBeforeEnter={false}>
        {menuView?.view === "MENU_INTRO" && (
          <motion.div
            layout
            key="menu_intro"
            variants={tabVariant}
            initial="inactive"
            animate="active"
            exit="inactive"
          >
            <MenuIntro />
          </motion.div>
        )}

        {menuView?.view === "MENU" && (
          <motion.div
            layout
            key="menu"
            variants={tabVariant}
            // initial={action === "GO" ? "inactiveRight" : "inactive"}
            initial="inactiveRight"
            animate="active"
            // animate={action === "GO" ? "active" : "inactive"}
            // exit={() => getExitAnimation(menuView)}
            // exit={action === "GO" ? "inactive" : "inactiveRight"}

            exit="inactiveRight"
            // exit={exit}
          >
            <Menu categories={data?.categories} />
          </motion.div>
        )}

        {menuView?.view === "MENU_SUB_1" && (
          <motion.div
            layout
            key="menu_sub_1"
            variants={tabVariant}
            initial="inactiveRight"
            animate={action === "GO" ? "active" : "inactive"}
            exit="inactive"
          >
            <SubMenu />
          </motion.div>
        )}

        {menuView?.view === "MENU_SUB_2" && (
          <motion.div
            key="menu_sub_2"
            variants={tabVariant}
            initial="inactiveRight"
            animate={action === "GO" ? "active" : "inactive"}
            exit="inactive"
          >
            <SubMenu />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
