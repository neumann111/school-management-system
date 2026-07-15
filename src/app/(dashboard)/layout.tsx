import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100">
      <Menu />

      <div className="ml-20 lg:ml-72 flex min-h-screen flex-col">
        <Navbar />

        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="rounded-2xl bg-white p-4 md:p-6 shadow-sm">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}