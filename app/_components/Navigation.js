"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import UserMenuItem from "@/app/_components/UserMenuItem";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="z-10 text-lg relative">
      {/* دکمه منوی همبرگری فقط برای موبایل */}
      <button
        className="md:hidden p-2 text-primary-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* منوی موبایل */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-primary-900 shadow-lg p-6 transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <ul className="flex flex-col gap-6 mt-12">
          <li onClick={() => setIsOpen(false)}>
            <UserMenuItem />
          </li>
          <li>
            <Link href="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/cabins" className="hover:text-accent-400" onClick={() => setIsOpen(false)}>
              Cabins
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-accent-400" onClick={() => setIsOpen(false)}>
              About
            </Link>
          </li>
        </ul>
      </div>

      {/* منوی دسکتاپ */}
      <ul className="hidden md:flex gap-12 items-center">
        <li>
          <Link href="/cabins" className="hover:text-accent-400 transition-colors">
            Cabins
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-accent-400 transition-colors">
            About
          </Link>
        </li>
        <li>
          <UserMenuItem />
        </li>
      </ul>
    </nav>
  );
}
