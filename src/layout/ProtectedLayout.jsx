import LoadingPage from "@/components/loading-page/LoadingPage";
import { AppSidebar } from "@/components/sidebar/app-sidebar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { checkUserLoggedIn } from "@/store/authentication";
import { clearToaster } from "@/store/uiSlice";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";

let isInitial = true;

const ProtectedLayout = () => {
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
      console.log("the type is opro", type, message);
      toast[type](message);
    }

    return () => {
      dispatch(clearToaster());
    };
  }, [type, message, dispatch]);

  if (loading) {
    return <LoadingPage />;
  }

  if (!loading && !user && !isInitial) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <Toaster position="top-right" />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      Building Your Application
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default ProtectedLayout;
