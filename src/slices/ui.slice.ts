import { createSlice } from "@reduxjs/toolkit";
import { getToken } from "@framework/utils/get-token";

export interface UIState {
  isAuthorized: boolean;
  displayFilter: boolean;
  displayCart: boolean;
  displaySearch: boolean;
  displayMenu: boolean;
  drawerView: DRAWER_VIEWS;
  modalView: MODAL_VIEWS;
  modalData: any;
  toastText: ToastText;
  sidebarSubItems: any;
}

type MODAL_VIEWS =
  | "SIGN_UP_VIEW"
  | "LOGIN_VIEW"
  | "FORGET_PASSWORD"
  | "PRODUCT_VIEW"
  | null;
type DRAWER_VIEWS = "CART_SIDEBAR" | "MOBILE_MENU" | null;
type ToastText = string;

export const initialState: UIState = {
  isAuthorized: getToken() ? true : false,
  displayFilter: false,
  displayCart: false,
  displaySearch: false,
  displayMenu: false,
  drawerView: null,
  modalView: null,
  modalData: null,
  toastText: "",
  sidebarSubItems: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    authorize: (state) => {
      state.isAuthorized = true;
    },
    unauthorize: (state) => {
      state.isAuthorized = false;
    },
    openCart: (state) => {
      state.displayCart = true;
    },
    closeCart: (state) => {
      state.displayCart = false;
    },
    toggleCart: (state) => {
      state.displayCart = !state.displayCart;
    },

    openFilter: (state) => {
      state.displayFilter = true;
    },
    closeFilter: (state) => {
      state.displayFilter = false;
    },
    openSearch: (state) => {
      state.displaySearch = true;
    },
    closeSearch: (state) => {
      state.displaySearch = false;
    },

    setModalView: (state, action) => {
      state.modalView = action.payload;
    },
    setDrawerView: (state, action) => {
      state.drawerView = action.payload;
    },
    setMenuView: (state, action) => {
      state.displayMenu = action.payload;
    },
    setModalData: (state, action) => {
      state.modalData = action.payload;
    },
    setSidebarSubItems: (state, action) => {
      state.sidebarSubItems = action.payload;
    },
  },
});

export const {
  authorize,
  unauthorize,
  openCart,
  closeCart,
  toggleCart,
  openFilter,
  closeFilter,
  openSearch,
  closeSearch,
  setModalView,
  setDrawerView,
  setMenuView,
  setModalData,
  setSidebarSubItems,
} = uiSlice.actions;

export default uiSlice.reducer;
