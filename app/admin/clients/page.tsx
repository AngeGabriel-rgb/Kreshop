"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { AdminClients } from "@/components/admin/admin-clients"

export default function AdminClientsPage() {
  return (
    <AdminLayout>
      <AdminClients />
    </AdminLayout>
  )
}
