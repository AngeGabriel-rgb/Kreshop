"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  LayoutDashboard,
  Package,
  BarChart3,
  ShoppingCart,
  Users,
  Settings,
  Bell,
  Search,
  LogOut,
  User,
  Shield,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { useEffect, useState, Suspense } from "react"
import ProtectedRoute from "@/components/protected-route"

interface AdminLayoutProps {
  children: React.ReactNode
}

function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { getUser, logout: authLogout } = useAuth()
  const [user, setUser] = useState<any>(null)
  const [isLoadingLogout, setIsLoadingLogout] = useState(false)

  useEffect(() => {
    setUser(getUser())
  }, [getUser]) // getUser is now a stable reference due to useCallback in useAuth

  const handleLogout = async () => {
    setIsLoadingLogout(true)
    try {
      await authLogout()
      setUser(null)
      router.push("/admin/login")
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
    } finally {
      setIsLoadingLogout(false)
    }
  }

  const navigation = [
    {
      name: "Tableau de Bord",
      href: "/admin", // Adjusted to be explicit
      icon: LayoutDashboard,
    },
    {
      name: "Commandes",
      href: "/admin/orders",
      icon: ShoppingCart,
    },
    {
      name: "Produits",
      href: "/admin/products",
      icon: Package,
    },
    {
      name: "Analytics",
      href: "/admin/analytics",
      icon: BarChart3,
    },
    {
      name: "Clients",
      href: "/admin/clients",
      icon: Users,
    },
    {
      name: "Paramètres",
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center space-x-2 px-4 py-2">
          <div className="w-8 h-8 bg-accent-foreground rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">K</span>
          </div>
          <span className="font-bold text-xl text-foreground">KreShop</span>
          <Badge className="bg-primary text-primary-foreground text-xs">Admin</Badge>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.href}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user?.prenom ? user.prenom.charAt(0) : ""}
                      {user?.nom ? user.nom.charAt(0) : ""}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">
                      {user?.prenom} {user?.nom}
                    </span>
                    <span className="text-xs text-muted-foreground">{user?.email}</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/admin/profile">
                    <User className="mr-2 h-4 w-4" />
                    Mon Profil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin/security">
                    <Shield className="mr-2 h-4 w-4" />
                    Sécurité
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Paramètres
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} disabled={isLoadingLogout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  {isLoadingLogout ? "Déconnexion..." : "Déconnexion"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <ProtectedRoute requireAuth requireAdmin redirectTo="/admin/login">
      <SidebarProvider>
        <Suspense fallback={null}>
          <AppSidebar />
          <SidebarInset>
            {/* Top header */}
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background">
              <SidebarTrigger className="-ml-1" />
              <div className="flex flex-1 items-center justify-between">
                {/* Search */}
                <div className="relative hidden md:block ml-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Rechercher..."
                    className="pl-10 w-64 border-input focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  {/* Notifications */}
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                      0
                    </Badge>
                  </Button>
                </div>
              </div>
            </header>
            {/* Page content */}
            <main className="flex-1 overflow-auto p-4 lg:p-6">{children}</main>
          </SidebarInset>
        </Suspense>
      </SidebarProvider>
    </ProtectedRoute>
  )
}
