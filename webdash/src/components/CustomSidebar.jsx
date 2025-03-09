"use client";

import { SidebarProvider, Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { IconUser, IconUsersGroup , IconBrandGoogleAnalytics , IconBurger ,IconCalendarWeek} from "@tabler/icons-react";
import { useEffect, useState } from "react";

const sidebarLinks = [
  { href: "/dashboard/analytics", label: "Dashboard", icon: < IconBrandGoogleAnalytics size={20} /> },
  { href: "/dashboard/chatbot", label: "ChatBot", icon: <IconUsersGroup size={20} /> },
  { href: "/dashboard/calendar", label: "Calendar", icon: <IconCalendarWeek size={20} /> },
  { href: "/dashboard/mealcheck", label: "Meal", icon: <IconBurger size={20} /> },
];



export default function CustomSidebar() {
  const [fetchData , setFetchData] = useState(false)
  const userId = localStorage.getItem("userId")
  useEffect(() => {
     
        const loginUser = async () => {
          try {
            const res = await fetch("/api/getuser", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ userId}),
            });
  
            const responseData = await res.json();
            if (!res.ok) {
              throw new Error(responseData.message || "No user");
            }
            console.log(responseData)
          } catch (err) {
            setError(err.message);
          } finally {
            setFetchData(false);
          }
        };
        loginUser();
      
    });

  return (
    <Sidebar>
      <SidebarBody>
      <h1></h1>
        <nav className="flex flex-col gap-2 mt-4">
          {sidebarLinks.map((link) => (
            <SidebarLink key={link.href} link={link} />
          ))}
        </nav>
      </SidebarBody>
    </Sidebar>
  );
}
