import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./user";

// redux 생성 (저장소)
const store = configureStore({
  reducer: { user: userReducer },
});

export default store;
