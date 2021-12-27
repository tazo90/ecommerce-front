import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Transition } from "react-transition-group";
import { setMenuView, setSidebarSubItems } from "@slices/ui.slice";
import { setCategories, setCategoryProducts } from "@slices/category.slice";
import { useCategoriesQuery } from "@framework/category/get-all-categories";
import { SubMenu } from "./sub-menu";
import { MenuIntro } from "./menu-intro";
import { Menu } from "./menu";

function getAnimationStyle(state: string, cssAnimatinoClass: string) {
  if (state === "entering") {
    return { animation: `${cssAnimatinoClass} .25s forwards` };
  } else if (state === "entered") {
    return { transform: "translateX(0)" };
  }
  return { animation: `${cssAnimatinoClass} .15s reverse backwards` };
}

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
  }, [sidebarOpen]);

  useEffect(() => {
    dispatch(setCategories(data));
    dispatch(setCategoryProducts(data));
  }, [data]);

  function SidebarMenu(state) {
    const style = getAnimationStyle(state, "moveSideBar");

    return (
      <div className="flex flex-col w-full h-full" style={style}>
        <Transition
          in={menuView?.view === "MENU_INTRO"}
          timeout={250}
          unmountOnExit
          mountOnEnter
        >
          {(state) => <MenuIntro state={state} />}
        </Transition>
        <Transition
          in={menuView?.view === "MENU"}
          timeout={250}
          unmountOnExit
          mountOnEnter
        >
          {(state) => (
            <Menu
              state={state}
              categories={data?.categories}
              menuView={menuView}
            />
          )}
        </Transition>
        <Transition
          in={menuView?.view === "MENU_SUB_1"}
          timeout={250}
          unmountOnExit
          mountOnEnter
        >
          {(state) => <SubMenu state={state} />}
        </Transition>
      </div>
    );
  }

  return (
    <Transition in={sidebarOpen} timeout={250} mountOnEnter unmountOnExit>
      {(state) => {
        if (state === "exited") {
          dispatch(setSidebarSubItems(null));
        }
        return SidebarMenu(state);
      }}
    </Transition>
  );
}
