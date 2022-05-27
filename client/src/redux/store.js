import { configureStore } from "@reduxjs/toolkit";

import nameReducer from "./nameSlice";
import tokenReducer from "./tokenSlice";

const store = configureStore({
  reducer: {
    name: nameReducer,
    token: tokenReducer,
  },
});

export default store;