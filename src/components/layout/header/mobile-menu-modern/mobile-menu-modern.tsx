import React, { useEffect } from "react";
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
    dispatch(
      setMenuView({
        view: "MENU_INTRO",
        action: "GO",
      })
    );

    return () => {
      dispatch(setSidebarSubItems(null));
    };
  }, [sidebarOpen]);

  useEffect(() => {
    dispatch(setCategories(data));
    dispatch(setCategoryProducts(data));
  }, [data]);

  const action = menuView?.action || "GO";

  console.log(menuView);

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
            initial="inactiveRight"
            animate={action === "GO" ? "active" : "inactive"}
            exit={action === "GO" ? "inactiveRight" : "inactive"}
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
