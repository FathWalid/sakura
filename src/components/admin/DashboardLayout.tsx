import { AdminSidebar } from "./AdminSidebar";

export function DashboardLayout({ children, onLogout }: any) {
  return (
    <div className="min-h-screen flex bg-cream">
      <AdminSidebar onLogout={onLogout} />
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
