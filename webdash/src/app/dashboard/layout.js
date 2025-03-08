import CustomSidebar from "@/components/CustomSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      
      <CustomSidebar />


      <div className="flex-1 p-6 overflow-auto">{children}</div>
    </div>
  );
}
