"use client"
import * as React from "react" // Ensure React is imported for useState and useEffect
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Home,
  Inbox,
  LayoutDashboard,
  Package,
  Search,
  Settings,
  ShoppingCart,
  Users,
  User2,
} from "lucide-react"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import { useAuth } from "@/lib/auth"

// Menu items for client
const clientItems = [
  {
    title: "Accueil",
    url: "/",
    icon: Home,
  },
  {
    title: "Produits",
    url: "/products",
    icon: Package,
  },
  {
    title: "Panier",
    url: "/panier",
    icon: ShoppingCart,
  },
  {
    title: "Mon Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Recherche",
    url: "/search",
    icon: Search,
  },
]

// Menu items for admin
const adminItems = [
  {
    title: "Dashboard Admin",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Gestion Produits",
    url: "/admin/products",
    icon: Package,
  },
  {
    title: "Gestion Commandes",
    url: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Gestion Clients",
    url: "/admin/clients",
    icon: Users,
  },
  {
    title: "Analytics",
    url: "/admin/analytics",
    icon: Calendar, // Using Calendar as a placeholder for Analytics icon
  },
  {
    title: "Paramètres",
    url: "/admin/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const { isAuthenticated, isAdmin, getUser, logout, clearAuthData } = useAuth()
  const { open: isSidebarOpen } = useSidebar()
  const pathname = usePathname()
  const user = getUser()

  // State to control rendering of client-side dependent content
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleLogout = () => {
    logout()
    clearAuthData()
    window.location.href = "/" // Redirect to home after logout
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <span className="font-serif text-lg font-bold text-corail-doux">KreShop</span>
                  <ChevronDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem>
                  <span>Boutique Gabonaise</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Paramètres</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {clientItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Render admin section only after client-side mount and if user is admin */}
        {isMounted && isAdmin() && (
          <>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel>Administration</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {adminItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={pathname.startsWith(item.url)}>
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}

        <SidebarSeparator />

        <Collapsible defaultOpen={isSidebarOpen} className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                Aide & Support
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/faq">
                        <Inbox />
                        <span>FAQ</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/contact">
                        <Settings />
                        <span>Contact</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            {/* Render user info/login button only after client-side mount */}
            {isMounted ? (
              isAuthenticated() ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton>
                      <User2 /> {user?.prenom || "Utilisateur"}
                      <ChevronUp className="ml-auto" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                    <DropdownMenuItem>
                      <Link href="/account">
                        <span>Mon Compte</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/dashboard">
                        <span>Mon Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    {isAdmin() && (
                      <DropdownMenuItem>
                        <Link href="/admin">
                          <span>Dashboard Admin</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={handleLogout}>
                      <span>Déconnexion</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <SidebarMenuButton asChild>
                  <Link href="/login">
                    <User2 /> Connexion
                  </Link>
                </SidebarMenuButton>
              )
            ) : (
              // Placeholder while mounting to avoid hydration mismatch
              <SidebarMenuButton>
                <User2 /> Chargement...
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
