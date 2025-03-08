"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // آیکون‌های منو

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="z-10 text-lg relative">
      {/* دکمه منوی موبایل */}
      <button
        className="md:hidden p-2 text-primary-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* منوی موبایل با انیمیشن از سمت چپ */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-primary-900 shadow-lg p-6 transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0 " : "-translate-x-full z-50"
        } md:hidden`}
      >
          
        <ul className="flex flex-col gap-6 mt-12">
        <li>
          <Link href="/">Home</Link>
        </li>
          <li>
            <Link
              href="/cabins"
              className="hover:text-accent-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Cabins
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="hover:text-accent-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Guest area
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
          <Link href="/account" className="hover:text-accent-400 transition-colors">
            Guest area
          </Link>
        </li>
      </ul>
    </nav>
  );
}
