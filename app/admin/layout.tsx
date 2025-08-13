import type React from "react"
import { AdminDashboardSidebar } from "@/components/admin-dashboard-sidebar"
import { ProtectedRoute } from "@/components/protected-route"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={["admin"]} redirectPath="/admin/login">
      <div className="flex min-h-screen bg-gray-100">
        <AdminDashboardSidebar />
        <div className="flex-1 p-4 md:p-8">{children}</div>
      </div>
    </ProtectedRoute>
  )
}
