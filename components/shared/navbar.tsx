"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  FolderKanban,
  BarChart3,
  Users,
  User,
  Settings,
  CreditCard,
  LogOut,
  Menu,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/service/logout";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const navItems = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  { title: "Projects", href: "/projects", icon: FolderKanban },
  { title: "Analytics", href: "/analytics", icon: BarChart3 },
  { title: "Team", href: "/team", icon: Users },
];

const userMenuItems = [
  { title: "Profile", href: "/profile", icon: User },
  { title: "Billing", href: "/billing", icon: CreditCard },
  { title: "Settings", href: "/settings", icon: Settings },
];

type IUser = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    profile: {
      id: string;
      name: string;
      email: string;
      activeStatus: string;
      role: string;
      createdAt: string;
      updatedAt: string;
      profile: {
        id: string;
        profilePhoto: string;
        bio: string | null;
        userId: string;
        createdAt: string;
        updatedAt: string;
      };
    };
  };
};

type NavbarProps = {
  user: IUser;
};

export function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  const handleUserMenuAction = async (action: string) => {
    if (action === "logout") {
      await logout();
      toast.success("User Logged Out Successfully");
      router.push("/login");
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <LayoutDashboard className="size-4" />
          </span>
          <span className="text-lg font-semibold tracking-tight">
            NextJs Press
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Button
                variant="ghost"
                size="sm"
                render={<Link href={item.href} />}
              >
                <item.icon data-icon="inline-start" />
                {item.title}
              </Button>
            </li>
          ))}
        </ul>

        {/* Right side: mobile menu + user dropdown */}
        <div className="flex items-center gap-2">
          {/* Mobile nav dropdown */}
          {/* <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu" />
              }
            >
              <Menu />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuGroup>
                {navItems.map((item) => (
                  <DropdownMenuItem key={item.href} render={<Link href={item.href} />}>
                    <item.icon />
                    {item.title}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu> */}

          {/* User dropdown */}
          {user?.success ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="size-8">
                  <AvatarImage src="/diverse-avatars.png" alt="Jane Doe" />
                  <AvatarFallback>
                    {user?.data?.profile?.name?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-medium">
                        {user?.data?.profile?.name || "User"}
                      </span>
                      <span className="text-xs font-normal text-muted-foreground">
                        {user?.data?.profile?.email || "user@example.com"}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {userMenuItems.map((item) => (
                    <DropdownMenuItem
                      key={item.href}
                      render={<Link href={item.href} />}
                    >
                      <item.icon />
                      {item.title}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={async () => {
                    await handleUserMenuAction("logout");
                  }}
                >
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
