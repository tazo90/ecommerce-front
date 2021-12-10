import { combineReducers } from "@reduxjs/toolkit";

import uiReducer from '@slices/ui.slice';

const rootReducer = combineReducers({
  ui: uiReducer
});

export default rootReducer;
