"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Package2, LayoutDashboard, ShoppingBag, Tag, Users, BarChart2, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useClerkAuth } from "@/hooks/use-clerk-auth" // Use the new Clerk auth hook
import { useClerk } from "@clerk/nextjs" // Use Clerk for logout functionality

export function AdminDashboardSidebar() {
  const pathname = usePathname()
  const { signOut } = useClerk() // Use Clerk's signOut function

  const handleLogout = async () => {
    await signOut()
  }

  const navItems = [
    {
      href: "/admin",
      icon: LayoutDashboard,
      label: "Tableau de bord",
    },
    {
      href: "/admin/products",
      icon: ShoppingBag,
      label: "Produits",
    },
    {
      href: "/admin/categories",
      icon: Tag,
      label: "Catégories",
    },
    {
      href: "/admin/orders",
      icon: Package2,
      label: "Commandes",
    },
    {
      href: "/admin/clients", // Assuming you might add a clients management page
      icon: Users,
      label: "Clients",
    },
    {
      href: "/admin/analytics",
      icon: BarChart2,
      label: "Analyses",
    },
    {
      href: "/admin/settings",
      icon: Settings,
      label: "Paramètres",
    },
  ]

  return (
    <div className="hidden w-64 flex-col border-r bg-beige-creme p-4 md:flex">
      <div className="flex items-center justify-center pb-4">
        <Link href="/admin" className="flex items-center gap-2 font-bold text-brun-chocolat">
          <Package2 className="h-6 w-6" />
          <span>Admin KreShop</span>
        </Link>
      </div>
      <Separator className="mb-4" />
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-brun-chocolat transition-all hover:bg-corail-doux hover:text-white ${
              pathname === item.href ? "bg-corail-intensifie text-white" : ""
            }`}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto pt-4">
        <Separator className="mb-4" />
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-brun-chocolat hover:bg-corail-doux hover:text-white"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Déconnexion
        </Button>
      </div>
    </div>
  )
}
