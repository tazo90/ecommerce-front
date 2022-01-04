import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setDrawerView } from "@slices/ui.slice";
import { setCategories, setCategoryProducts } from "@slices/category.slice";
import { useCategoriesQuery } from "@framework/category/get-all-categories";
import { SubMenu } from "./sub-menu";
import { MenuIntro } from "./menu-intro";
import { Menu } from "./menu";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

type MENU_VIEW = "MENU_INTRO" | "MENU" | "MENU_SUB_1" | "MENU_SUB_2" | null;

const MENUS = ["MENU_INTRO", "MENU", "MENU_SUB_1", "MENU_SUB_2"];

// const variant = {
//   show: {
//     x: 0,
//     transition: {
//       type: "tween",
//       duration: 0.4,
//     },
//   },
//   hidden: {
//     x: "-100%",
//     transition: {
//       type: "tween",
//       duration: 0.4,
//     },
//   },
//   hiddenRight: {
//     x: "100%",
//     transition: {
//       type: "tween",
//       duration: 0.4,
//     },
//   },
// };

const transition = {
  type: "tween",
  duration: 0.4,
};

const variant = {
  // hidden: (origin) =>
  //   origin === "left" ? { x: "-100%", transition } : { x: "100%", transition },
  initial: (origin) => {
    console.log("INIT", origin);
    if (origin.initial === "left") {
      return { x: "-100%", transition };
    }
    return { x: "100%", transition };
  },
  exit: (origin) => {
    console.log("EXIT", origin);
    if (origin.exit === "left") {
      return { x: "-100%", transition };
    }
    return { x: "100%", transition };
  },

  // initial: (action) => {
  //   if (action.next === null) {
  //     return { x: "-100%", transition };
  //   }

  //   if (action.next) {
  //     return { x: "100%", transition };
  //   } else if (action.back) {
  //     return { x: "-100%", transition };
  //   }
  // },
  // exit: (action) => {
  //   if (action.next === null) {
  //     return { x: "-100%", transition };
  //   }

  //   if (action.next) {
  //     return { x: "-100%", transition };
  //   } else if (action.back) {
  //     return { x: "100%", transition };
  //   }
  // },
  visible: { x: 0, transition },
};

const initialOrigin = {
  initial: "right",
  exit: "left",
  menu: "",
  isBack: false,
};

const MobileMenuSide = ({ sidebarOpen }) => {
  const dispatch = useDispatch();

  const [menuItems, setMenuItems] = useState<any>([]);
  const [menuView, setMenuView] = useState<MENU_VIEW>(null);

  const [nextPage, setNextPage] = useState(false);
  const [backPage, setBackPage] = useState(false);

  const [origin, setOrigin] = useState(initialOrigin);

  // TODO: Move it to containers/categories-block
  const { data, isLoading, error } = useCategoriesQuery();

  let currentMenu = menuItems?.length >= 1 ? menuItems?.slice(-1)[0] : null;
  let previousMenu = menuItems?.length >= 2 ? menuItems?.slice(-2)[0] : null;

  // const controls = useAnimation();

  useEffect(() => {
    if (sidebarOpen) {
      setMenuView("MENU_INTRO");
    }

    return () => {
      setMenuView(null);
      setMenuItems([]);
      setOrigin(initialOrigin);
    };
  }, [sidebarOpen]);

  useEffect(() => {
    dispatch(setCategories(data));
    dispatch(setCategoryProducts(data));
  }, [data]);

  // useEffect(() => {
  //   // console.log("CHANGE ANIMATION", menuView, isGo);
  //   // if (menuView?.action === "BACK") {
  //   //   setOriginMenu("right");
  //   // } else if (menuView?.action === "GO") {
  //   //   setOriginMenu("left");
  //   //   controls.start("visible");
  //   // }
  // }, [controls, menuView]);

  useEffect(() => {
    if (nextPage) {
      setOrigin({
        initial: "right",
        exit: "left",
        menu: menuView,
        isBack: false,
      });
    } else if (backPage) {
      setOrigin({
        initial: "left",
        exit: "right",
        menu: menuView,
        isBack: true,
      });

      // console.log("ORIG", origin);
    }
  }, [backPage, nextPage]);

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

      // if (isGo) {
      //   setOriginMenu("left");
      //   setOriginSubMenu("right");
      // } else {
      //   setOriginMenu("left");
      //   setOriginSubMenu("right");
      // }

      // setOriginPrev("left");

      setNextPage(true);
      setBackPage(false);
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

    // console.log("BACK");

    // if (isGo) {
    //   setOriginMenu("left");
    //   setOriginSubMenu("right");
    // } else {
    //   setOriginMenu("right");
    //   setOriginSubMenu("left");
    // }

    setBackPage(true);
    setNextPage(false);
  }, [menuView]);

  console.log("ORIGIN", origin);

  return (
    <div className="flex flex-col w-full h-full relative">
      <AnimatePresence exitBeforeEnter={false}>
        {menuView === "MENU_INTRO" && (
          <motion.div
            layout
            key="menu_intro"
            variants={variant}
            initial="initial"
            animate="visible"
            exit="exit"
            custom={{
              initial: "left",
              exit: "left",
              menu: "MENU_INTRO",
              isBack: false,
            }}
            // custom={{ next: nextPage, back: backPage }}
          >
            <MenuIntro
              handleCloseMenu={handleCloseMenu}
              handleMenuClick={() => {
                setMenuView("MENU");
                setMenuItems([{ label: null, items: data?.categories }]);

                setNextPage(true);
                setBackPage(false);
              }}
            />
          </motion.div>
        )}

        {menuView === "MENU" && (
          <motion.div
            layout
            key="menu"
            variants={variant}
            // initial={action === "GO" ? "hiddenRight" : "hidden"}
            initial="initial"
            // animate="show"
            // exit={action === "GO" ? "hidden" : "hiddenRight"}
            exit="exit"
            animate="visible"
            // custom={isBack ? origin : originClose}
            custom={origin}
            // custom={{ next: nextPage, back: backPage }}
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

        {/* {menuView === "MENU_SUB_1" && (
          <motion.div
            layout
            key="menu_sub_1"
            variants={variant}
            initial="initial"
            exit="exit"
            animate="visible"
            // custom={origin}
            custom={origin}
            // initial={action === "GO" ? "hiddenRight" : "hidden"}
            // animate="show"
            // exit={action === "GO" ? "hidden" : "hiddenRight"}
          >
            <SubMenu
              handleOpenMenu={handleOpenMenu}
              handleBackMenu={handleBackMenu}
              handleCloseMenu={handleCloseMenu}
              currentMenu={currentMenu}
              previousMenu={previousMenu}
            />
          </motion.div>
        )} */}

        {/* 
        {menuView === "MENU_SUB_2" && (
          <motion.div
            key="menu_sub_2"
            variants={variant}
            initial="hidden"
            animate="visible"
            exit="hidden"
            custom={originMenu}
          >
            <SubMenu
              handleOpenMenu={handleOpenMenu}
              handleBackMenu={handleBackMenu}
              handleCloseMenu={handleCloseMenu}
              currentMenu={currentMenu}
              previousMenu={previousMenu}
            />
          </motion.div>
        )} */}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenuSide;
