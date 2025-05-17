import Link from "next/link"
import { unauthorized } from "next/navigation"
import {
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconSettings,
} from "@tabler/icons-react"

import { logout } from "@/lib/auth"
import { getAvatarFallback } from "@/lib/utils"
import { useAuthStore } from "@/hooks/use-auth-store"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavUser() {
  const { isMobile } = useSidebar()

  const { auth } = useAuthStore()

  // The auth object should not be null here
  if (!auth) unauthorized()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={auth.avatar_url || undefined}
                  alt={auth.display_name || undefined}
                />
                <AvatarFallback className="rounded-lg">
                  {getAvatarFallback(auth.display_name || "")}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {auth.display_name}
                </span>
                <span className="text-muted-foreground truncate text-xs">
                  {auth.email}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={auth.avatar_url || undefined}
                    alt={auth.display_name || undefined}
                  />
                  <AvatarFallback className="rounded-lg">
                    {getAvatarFallback(auth.display_name || "")}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {auth.display_name}
                  </span>
                  <span className="text-muted-foreground truncate text-xs">
                    {auth.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {/* Notifications */}
              <Link href="/dashboard/notifications">
                <DropdownMenuItem className="cursor-pointer">
                  <IconNotification />
                  Notifications
                </DropdownMenuItem>
              </Link>
              <Link href="/dashboard/settings">
                {/* Settings */}
                <DropdownMenuItem className="cursor-pointer">
                  <IconSettings />
                  Settings
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={logout}>
              <IconLogout />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
