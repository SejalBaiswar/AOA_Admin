import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "../components/ui/sidebar";

import { Home, Stethoscope, Handshake } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function AppSidebar() {
  return (
    <Sidebar
      collapsible="icon"
      variant="inset"
      className="top-14 h-[calc(100vh-3.5rem)] overflow-y-auto border-r border-gray-600 dark:border-gray-800"
    >
      <SidebarHeader
        className="
          flex px-2
          group-data-[state=expanded]:justify-end
          group-data-[state=collapsed]:justify-start
        "
      >
        <SidebarTrigger />
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>

          {/* ================= DASHBOARD ================= */}
          <SidebarMenuItem>
            <NavLink to="/" end>
              {({ isActive }) => (
                <SidebarMenuButton
                  tooltip="Dashboard"
                  className={
                    isActive
                      ? "bg-black text-white hover:bg-black"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }
                >
                  <Home
                    className={`h-4 w-4 ${
                      isActive ? "text-white" : "text-gray-700"
                    }`}
                  />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              )}
            </NavLink>
          </SidebarMenuItem>

          {/* ================= PRACTICES ================= */}
          <SidebarMenuItem>
            <NavLink to="/practices">
              {({ isActive }) => (
                <SidebarMenuButton
                  tooltip="Practice"
                  className={
                    isActive
                      ? "bg-black text-white hover:bg-black"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }
                >
                  <Stethoscope
                    className={`h-4 w-4 ${
                      isActive ? "text-white" : "text-gray-700"
                    }`}
                  />
                  <span>Practices</span>
                </SidebarMenuButton>
              )}
            </NavLink>
          </SidebarMenuItem>

          {/* ================= PARTNERS ================= */}
          <SidebarMenuItem>
            <NavLink to="/partners">
              {({ isActive }) => (
                <SidebarMenuButton
                  tooltip="Partner"
                  className={
                    isActive
                      ? "bg-black text-white hover:bg-black"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }
                >
                  <Handshake
                    className={`h-4 w-4 ${
                      isActive ? "text-white" : "text-gray-700"
                    }`}
                  />
                  <span>Partners</span>
                </SidebarMenuButton>
              )}
            </NavLink>
          </SidebarMenuItem>

        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
