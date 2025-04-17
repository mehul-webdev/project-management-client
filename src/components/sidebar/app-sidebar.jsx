import React from "react";
import {
  BookOpen,
  Bot,
  Command,
  FolderDot,
  Frame,
  Home,
  Inbox,
  LayoutDashboard,
  LifeBuoy,
  Map,
  PieChart,
  Search,
  Send,
  Sparkles,
  Workflow,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";

import { NavUser } from "./nav-user";

import { NavFavorites } from "./nav-favorites";
import { useSelector } from "react-redux";

export function AppSidebar(props) {
  const { user } = useSelector((state) => state.auth);

  const data = {
    user: user,
    navMain: [
      {
        title: "Dashboard",
        url: "/",
        icon: LayoutDashboard,
        isActive: true,
      },
      {
        title: "Create Project",
        url: "/create-project",
        icon: FolderDot,
      },
      {
        title: "Ask AI",
        url: "#",
        icon: Sparkles,
      },
    ],
    projects: [],
    favorites: [],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-md leading-tight">
                  <span className="truncate font-semibold">Project</span>
                  <span className="truncate text-xs">Management</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavFavorites favorites={data.favorites} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>{user && <NavUser user={data.user} />}</SidebarFooter>
    </Sidebar>
  );
}
