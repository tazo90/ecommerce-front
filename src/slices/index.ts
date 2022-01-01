import { combineReducers } from "@reduxjs/toolkit";

import uiReducer from "@slices/ui.slice";
import categoryReducer from "@slices/category.slice";

const rootReducer = combineReducers({
  ui: uiReducer,
  category: categoryReducer,
});

export default rootReducer;
