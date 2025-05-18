import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu } from "lucide-react"

import { site } from "@/config/site"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const Navigation: React.FC = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <span className="sr-only">Open navigation</span>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
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
          <SheetTitle className="sr-only">{site.name}</SheetTitle>
          <SheetDescription className="sr-only">
            {site.description}
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4"></div>
        <SheetFooter>
          <SheetClose asChild></SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
export default Navigation
