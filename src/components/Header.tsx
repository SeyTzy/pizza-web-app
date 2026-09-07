import { Link, useRouterState } from "@tanstack/react-router";
import { LogIn, LogOut, Menu, Pizza, ShoppingBag, UserRound } from "lucide-react";
import { useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CartSheet } from "@/components/CartSheet";
import { useAuth } from "@/lib/auth";
import { useCart } from "@/lib/cart";

const navLinks = [
  { to: "/", label: "ទំព័រដើម" },
  { to: "/menu", label: "ម៉ឺនុយ" },
  { to: "/about", label: "អំពីយើង" },
  { to: "/contact", label: "ទំនាក់ទំនង" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { count } = useCart();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <Pizza className="h-7 w-7 text-primary" />
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            Harvest Pizza
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeProps={{
                className: "text-foreground font-semibold bg-primary/10",
              }}
              inactiveProps={{ className: "text-muted-foreground" }}
              activeOptions={{ exact: link.to === "/" }}
              className="rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
            className="relative"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold text-primary-foreground">
                {count}
              </span>
            )}
          </Button>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 text-foreground">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <UserRound className="h-4 w-4" />
                  </span>
                  <span className="max-w-[8rem] truncate">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="truncate">{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  ចាកចេញ
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              to="/login"
              className={buttonVariants({
                variant: "ghost",
                className: "text-foreground",
              })}
            >
              <LogIn className="mr-1.5 h-4 w-4" />
              ចូលគណនី
            </Link>
          )}
          <Link
            to="/contact"
            className={buttonVariants({
              variant: "outline",
              className: "border-primary/30 text-foreground",
            })}
          >
            កក់តុ
          </Link>
          <Link
            to="/menu"
            className={buttonVariants({
              className: "bg-primary text-primary-foreground hover:bg-primary/90",
            })}
          >
            កុម្ម៉ង់តាមអនឡាញ
          </Link>
        </div>

        {/* Mobile nav */}
        <div className="flex items-center gap-1 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
            className="relative"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold text-primary-foreground">
                {count}
              </span>
            )}
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-6 pt-6">
                <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                  <Pizza className="h-6 w-6 text-primary" />
                  <span className="font-display text-lg font-bold text-foreground">
                    Harvest Pizza
                  </span>
                </Link>
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className={`rounded-md px-3 py-2 text-base font-medium transition-colors ${
                        pathname === link.to
                          ? "bg-primary/10 text-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="flex flex-col gap-3 pt-4">
                  {user ? (
                    <>
                      <div className="flex items-center gap-2 rounded-md bg-muted/50 px-3 py-2">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <UserRound className="h-4 w-4" />
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-foreground">
                            {user.name}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          setOpen(false);
                          logout();
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        ចាកចេញ
                      </Button>
                    </>
                  ) : (
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/login" onClick={() => setOpen(false)}>
                        <LogIn className="mr-2 h-4 w-4" />
                        ចូលគណនី
                      </Link>
                    </Button>
                  )}
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-primary/30 text-foreground"
                  >
                    <Link to="/contact" onClick={() => setOpen(false)}>
                      កក់តុ
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Link to="/menu" onClick={() => setOpen(false)}>
                      កុម្ម៉ង់តាមអនឡាញ
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
    </header>
  );
}
