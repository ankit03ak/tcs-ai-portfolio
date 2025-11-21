"use client";

import { useState } from "react";

const NAV_ITEMS = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Why Hire Me", href: "#why-hire-me" },
  { label: "Resume", href: "https://drive.google.com/file/d/1ewuaMQXYiOwXZ5nc-Kqj7OjP-MUMuMIM/view" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      id="top"
      className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md"
    >
      <nav className="container flex items-center justify-between py-3">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center text-sm font-bold">
            AK
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-sm font-semibold tracking-tight">
              Ankit Kumar
            </span>
            <span className="text-xs text-slate-400">
              MERN Stack Developer !
            </span>
          </div>
        </div>

        <button
          className="sm:hidden inline-flex items-center p-2 rounded-md border border-slate-700 text-slate-200"
          onClick={() => setOpen((o) => !o)}
        >
          ☰
        </button>

        <ul className="hidden sm:flex items-center gap-6 text-sm text-slate-300">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="hover:text-emerald-400 transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {open && (
        <div className="sm:hidden border-t border-slate-800 bg-slate-950">
          <ul className="container py-3 space-y-2 text-sm text-slate-300">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block py-1"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
