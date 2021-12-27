import { createSlice } from "@reduxjs/toolkit";

export interface CategoryState {
  categories: any;
  categoryProducts: any;
}

export const initialState: CategoryState = {
  categories: null,
  categoryProducts: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setCategoryProducts: (state, action) => {
      const categoryProducts: any = {};

      action.payload?.categories.map((category: any) => {
        Object.values(category.products).map((product: any) => {
          product.subCategoryId?.map((categoryId: number) => {
            if (categoryProducts.hasOwnProperty(categoryId)) {
              categoryProducts[categoryId].push(product);
            } else {
              categoryProducts[categoryId] = [product];
            }
          });
        });
      });

      state.categoryProducts = categoryProducts;
    },
  },
});

export const { setCategories, setCategoryProducts } = categorySlice.actions;

export default categorySlice.reducer;
