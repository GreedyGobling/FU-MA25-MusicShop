import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createHashRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cartSlice.ts";
import HomePage from "./components/HomePage.tsx";
import ArtistPage from "./components/ArtistPage.tsx";
import Kassa from "./components/Kassa.tsx";

const router = createHashRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "artist/:id",
        Component: ArtistPage,
      },
      {
        path: "kassa",
        Component: Kassa,

      },
    ],
  },
]);

const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
