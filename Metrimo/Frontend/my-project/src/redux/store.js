// redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage

// Slices
import authReducer from "./slice/authSlice";
import venueReducer from "./slice/venueSlice";
import bookingReducer from "./slice/bookingSlice";

// RTK Query APIs
import { authApi } from "../services/auth-api";
import { venueApi } from "../services/venue-api";
import { bookingApi } from "../services/booking-api";

// Axios store injector
import { injectStore } from "../services/axios-instance";

/* ---------------- ROOT REDUCER ---------------- */
const rootReducer = combineReducers({
  auth: authReducer,
  venues: venueReducer,
  booking: bookingReducer,

  // RTK Query reducers
  [authApi.reducerPath]: authApi.reducer,
  [venueApi.reducerPath]: venueApi.reducer,
  [bookingApi.reducerPath]: bookingApi.reducer,
});

/* ---------------- PERSIST CONFIG ---------------- */
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], 
  // 👆 persist only auth (recommended)
  // add "booking" if you want booking persisted too
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

/* ---------------- STORE ---------------- */
export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist + FormData
    }).concat(
      authApi.middleware,
      venueApi.middleware,
      bookingApi.middleware
    ),
});

/* ---------------- PERSISTOR ---------------- */
export const persistor = persistStore(store);

// Inject store into axios
injectStore(store);
