"use client";
/* eslint-disable @next/next/no-html-link-for-pages -- Hard navigation intentionally bypasses the [id] intercepting modal for /todos/new. */

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/todos", label: "Todos" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/playground/a", label: "Playground" },
  { href: "/help/todos/create", label: "Help" },
  { href: "/archive", label: "Archive" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="navbar" aria-label="Main navigation">
      <span className="brand">Todo App</span>
      {links.map(({ href, label }) => (
        <Link key={href} href={href} className={pathname === href || (href !== "/" && pathname.startsWith(href + "/")) ? "active" : ""}>
          {label}
        </Link>
      ))}
      {/* Hard navigation avoids the (.)[id] interception mistaking 'new' for an ID. */}
      <a href="/todos/new">Create todo</a>
      <Link href="/login">Login</Link>
    </nav>
  );
}
