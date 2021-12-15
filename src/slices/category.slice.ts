import { createSlice } from "@reduxjs/toolkit";

export interface CategoryState {
  categoryProducts: any;
}

export const initialState: CategoryState = {
  categoryProducts: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategoryProducts: (state, action) => {
      state.categoryProducts = action.payload;
    },
  },
});

export const { setCategoryProducts } = categorySlice.actions;

export default categorySlice.reducer;
