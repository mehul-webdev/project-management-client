import LoadingPage from "@/components/loading-page/LoadingPage";
import { checkUserLoggedIn } from "@/store/authentication";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { Toaster } from "sonner";

let isInitial = true;
const AuthenticationLayout = () => {
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isInitial) {
      dispatch(checkUserLoggedIn());
      isInitial = false;
    }

    return () => {
      isInitial = true;
    };
  }, [dispatch]);

  if (loading) {
    return <LoadingPage />;
  }

  if (!loading && user && !isInitial) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {!user && (
        <main>
          <Toaster position="top-right" />
          <Outlet />
        </main>
      )}
    </>
  );
};

export default AuthenticationLayout;
