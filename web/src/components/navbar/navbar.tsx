"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { IconPlus } from "@tabler/icons-react"

import { site } from "@/config/site"
import { useAuthStore } from "@/hooks/use-auth-store"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/navbar/mode-toggle"
import Navigation from "@/components/navbar/navigation"
import UserMenu from "@/components/navbar/user-menu"

const Navbar: React.FC = () => {
  const { auth } = useAuthStore()
  return (
    <header className="bg-background">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        {/* Left */}
        <div className="flex items-center space-x-4">
          <Navigation />
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">{site.name}</span>
            <Image
              className="size-8"
              src="/logo.png"
              alt="Logo"
              width={32}
              height={32}
              priority
            />
          </Link>
        </div>
        {/* Right */}
        <div className="flex items-center justify-end space-x-4">
          <ModeToggle />
          {auth && (
            <Link href="/submit">
              <Button variant="ghost" size="icon">
                <span className="sr-only">Create a new post</span>
                <IconPlus />
              </Button>
            </Link>
          )}
          {auth && <UserMenu auth={auth} />}
          {!auth && (
            <Link href="/login">
              <Button variant="ghost">
                Log in <span aria-hidden="true">&rarr;</span>
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}
export default Navbar
