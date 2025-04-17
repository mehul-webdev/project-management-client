import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Provider } from "react-redux";
import store from "./store";
import { ThemeProvider } from "./context/ThemeProvider";
import LoadingPage from "./components/loading-page/LoadingPage";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Suspense fallback={<LoadingPage />}>
          <RouterProvider router={router} />
        </Suspense>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
