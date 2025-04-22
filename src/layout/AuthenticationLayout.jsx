import LoadingPage from "@/components/loading-page/LoadingPage";
import { checkUserLoggedIn } from "@/store/authentication";
import { clearToaster } from "@/store/uiSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { toast, Toaster } from "sonner";

let isInitial = true;
const AuthenticationLayout = () => {
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);
  const { type, message } = useSelector((state) => state.ui.toaster);

  useEffect(() => {
    if (isInitial) {
      dispatch(checkUserLoggedIn());
      isInitial = false;
    }

    return () => {
      isInitial = true;
    };
  }, [dispatch]);

  useEffect(() => {
    if (type && typeof toast[type] === "function" && message) {
      console.log("the type is auth", type, message);
      toast[type](message);
    }

    return () => {
      dispatch(clearToaster());
    };
  }, [type, message, dispatch]);

  if (loading) {
    return <LoadingPage />;
  }

  if (!loading && user && !isInitial) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Toaster position="top-right" />
      {!user && (
        <main>
          <Outlet />
        </main>
      )}
    </>
  );
};

export default AuthenticationLayout;
