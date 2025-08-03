"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, ShoppingCart, Users, BarChart2, Settings, Tags } from "lucide-react" // Import Tags icon

import { cn } from "@/lib/utils" // Assurez-vous que cn est importé depuis lib/utils

export function AdminDashboardSidebar() {
  const pathname = usePathname()

  const adminNavItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Produits",
      href: "/admin/products",
      icon: Package,
    },
    {
      name: "Catégories", // Nouvelle entrée
      href: "/admin/categories",
      icon: Tags, // Utilisation de l'icône Tags
    },
    {
      name: "Paramètres",
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  return (
    <nav className="flex flex-col gap-2 p-4 border-r bg-card text-card-foreground h-full">
      <h2 className="text-lg font-semibold mb-4 font-serif text-brun-chocolat dark:text-beige-creme">
        Admin Navigation
      </h2>
      {adminNavItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
            pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
              ? "bg-muted text-primary"
              : "",
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.name}
        </Link>
      ))}
    </nav>
  )
}
