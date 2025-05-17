"use client"

import React from "react"
import Link from "next/link"
import { IconLogout, IconNotification, IconSettings } from "@tabler/icons-react"

import { logout } from "@/lib/auth"
import { getAvatarFallback } from "@/lib/utils"
import { Auth } from "@/hooks/use-auth-store"
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

type UserMenuProps = {
  auth: Auth
}

const UserMenu: React.FC<UserMenuProps> = ({ auth }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-8 w-8 cursor-pointer rounded-lg">
          <AvatarImage
            src={auth.avatar_url || undefined}
            alt={auth.display_name || undefined}
          />
          <AvatarFallback className="rounded-lg">
            {getAvatarFallback(auth.display_name || "")}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        align="end"
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <Link href="/dashboard/profile">
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
                <span className="truncate font-medium">View Profile</span>
                <span className="text-muted-foreground truncate text-xs">
                  {auth.email}
                </span>
              </div>
            </div>
          </Link>
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
  )
}
export default UserMenu
