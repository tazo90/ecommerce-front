import { createSlice } from '@reduxjs/toolkit';
import { getToken } from '@framework/utils/get-token';

export interface UIState {
  isAuthorized: boolean;
  displaySidebar: boolean;
  displayFilter: boolean;
  displayModal: boolean;
  displayCart: boolean;
  displaySearch: boolean;
  modalView: MODAL_VIEWS;
  modalData: any;
  drawerView: DRAWER_VIEWS;
  toastText: ToastText;
}

type MODAL_VIEWS =
  | "SIGN_UP_VIEW"
  | "LOGIN_VIEW"
  | "FORGET_PASSWORD"
  | "PRODUCT_VIEW";
type DRAWER_VIEWS = "CART_SIDEBAR" | "MOBILE_MENU" | null;
type ToastText = string;

export const initialState: UIState = {
  isAuthorized: getToken() ? true : false,
  displaySidebar: false,
  displayFilter: false,
  displayModal: false,
  displayCart: false,
  displaySearch: false,
  modalView: "LOGIN_VIEW",
  drawerView: null,
  modalData: null,
  toastText: "",
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    authorize: (state) => { state.isAuthorized = true },
    unauthorize: (state) => { state.isAuthorized = false },
    openSidebar: (state) => { state.displaySidebar = true },
    closeSidebar: (state) => { state.displaySidebar = false },
    toggleSidebar: (state) => { state.displaySidebar = !state.displaySidebar },
    openCart: (state) => { state.displayCart = true },
    closeCart: (state) => { state.displayCart = false },
    toggleCart: (state) => { state.displayCart = !state.displayCart },
    
    openFilter: (state) => { state.displayFilter = true },
    closeFilter: (state) => { state.displayFilter = false },
    openModal: (state) => { state.displayModal = true },
    closeModal: (state) => { state.displayModal = false },
    openSearch: (state) => { state.displaySearch = true },
    closeSearch: (state) => { state.displaySearch = false },

    setModalView: (state, action) => { state.modalView = action.payload },
    setDrawerView: (state, action) => { state.drawerView = action.payload },
    setModalData: (state, action) => { state.modalData = action.payload },
  }
})

export const { 
  authorize,
  unauthorize,
  openSidebar,
  closeSidebar,
  toggleSidebar,
  openCart,
  closeCart,
  toggleCart,
  openFilter,
  closeFilter,
  openModal,
  closeModal,
  openSearch,
  closeSearch,
  setModalView,
  setDrawerView,
  setModalData,
} = uiSlice.actions;

export default uiSlice.reducer;
