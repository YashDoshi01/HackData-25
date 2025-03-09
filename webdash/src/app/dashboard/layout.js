import CustomSidebar from "@/components/CustomSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      
      <CustomSidebar />


      <div
        className="flex-1 p-6 overflow-auto bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/E:\hackdata(web)\HackData-25\webdash\public\background-2076334_1280.jpg')" }}
      >{children}</div>
    </div>
  );
}
