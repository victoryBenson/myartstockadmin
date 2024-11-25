import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="flex min-h-screen">
        <Sidebar/>
        <main className="w-full">
          <div className="sticky top-0 bg-pink-400 z-[99]">
            <Navbar/>
          </div>
          {children}
        </main>
      </div>
    );
  }
  