import { createSlice } from "@reduxjs/toolkit";

export interface ProductState {
  currentProduct: any;
}

export const initialState: ProductState = {
  currentProduct: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload;
    },
  },
});

export const { setCurrentProduct } = productSlice.actions;

export default productSlice.reducer;
