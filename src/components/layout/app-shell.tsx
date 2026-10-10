"use client";

import { Menu } from "lucide-react";
import { useState } from "react";

import { Brand } from "@/components/layout/brand";
import { LevelProvider } from "@/components/level/level-provider";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { UserMenu } from "@/components/layout/user-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { AuthedUser } from "@/lib/auth-guard";

export function AppShell({
  user,
  signOutAction,
  children,
}: {
  user: AuthedUser;
  signOutAction: () => Promise<void>;
  children: React.ReactNode;
}) {
  // Each nav link closes the drawer via `onNavigate`, which is why there is no
  // effect watching the pathname here.
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <LevelProvider level={user.level}>
      <div className="flex min-h-dvh">
      {/* Desktop sidebar: one screen tall and sticky, so the account menu sits
          at the bottom of the window on every page. */}
      <aside className="bg-sidebar border-sidebar-border sticky top-0 hidden h-dvh w-60 shrink-0 flex-col gap-6 border-r p-3 lg:flex">
        <div className="px-2 pt-2">
          <Brand level={user.level} />
        </div>
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          <SidebarNav />
        </div>
        <div className="border-sidebar-border flex items-center gap-1 border-t pt-2">
          <div className="min-w-0 flex-1">
            <UserMenu user={user} signOutAction={signOutAction} />
          </div>
          <ThemeToggle />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile header */}
        <header className="bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-30 flex h-[calc(3.5rem+env(safe-area-inset-top))] items-center gap-2 border-b px-3 pt-[env(safe-area-inset-top)] backdrop-blur lg:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-9 cursor-pointer"
                aria-label="Open navigation"
              >
                <Menu className="size-5" aria-hidden />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="bg-sidebar flex w-64 flex-col gap-6 p-3 pt-[max(0.75rem,env(safe-area-inset-top))]"
            >
              <SheetHeader className="p-0">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <div className="px-2 pt-2">
                  <Brand level={user.level} />
                </div>
              </SheetHeader>
              <SidebarNav onNavigate={() => setMobileOpen(false)} />
              <div className="border-sidebar-border border-t pt-2">
                <UserMenu user={user} signOutAction={signOutAction} />
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex-1">
            <Brand level={user.level} />
          </div>
          <ThemeToggle />
        </header>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
      </div>
    </LevelProvider>
  );
}
