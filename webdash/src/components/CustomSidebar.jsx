"use client";

import { SidebarProvider, Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { IconUser, IconUsersGroup , IconBrandGoogleAnalytics , IconBurger ,IconCalendarWeek} from "@tabler/icons-react";

const sidebarLinks = [
  { href: "/dashboard/analytics", label: "Dashboard", icon: < IconBrandGoogleAnalytics size={20} /> },
  { href: "/dashboard/chatbot", label: "ChatBot", icon: <IconUsersGroup size={20} /> },
  { href: "/dashboard/calendar", label: "Calendar", icon: <IconCalendarWeek size={20} /> },
  { href: "/dashboard/mealcheck", label: "Meal", icon: <IconBurger size={20} /> },
];

export default function CustomSidebar() {
  return (
    <Sidebar>
      <SidebarBody>
        <nav className="flex flex-col gap-2 mt-4">
          {sidebarLinks.map((link) => (
            <SidebarLink key={link.href} link={link} />
          ))}
        </nav>
      </SidebarBody>
    </Sidebar>
  );
}
