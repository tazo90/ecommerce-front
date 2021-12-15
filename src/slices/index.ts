import { combineReducers } from "@reduxjs/toolkit";

import uiReducer from "@slices/ui.slice";
import categoryReducer from "@slices/category.slice";
import productReducer from "@slices/product.slice";

const rootReducer = combineReducers({
  ui: uiReducer,
  category: categoryReducer,
  product: productReducer,
});

export default rootReducer;
