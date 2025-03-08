"use client";
import { useState } from 'react';
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import SignOutButton from '@/app/_components/SignOutButton';
import Link from 'next/link';

const navLinks = [
  {
    name: 'Home',
    href: '/account',
    icon: <HomeIcon className='h-5 w-5 text-primary-600' />,
  },
  {
    name: 'Reservations',
    href: '/account/reservations',
    icon: <CalendarDaysIcon className='h-5 w-5 text-primary-600' />,
  },
  {
    name: 'Guest profile',
    href: '/account/profile',
    icon: <UserIcon className='h-5 w-5 text-primary-600' />,
  },
];

function SideNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Menu Button (Mobile) */}
      <button
        className='md:hidden fixed top-190 right-8 z-50 p-2 bg-primary-900 rounded-lg text-primary-100'
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <XMarkIcon className='h-6 w-6' />
        ) : (
          <Bars3Icon className='h-6 w-6' />
        )}
      </button>

      {/* Side Navigation (Mobile and Desktop) */}
      <nav
        className={`fixed md:static inset-y-0 left-0 w-64 bg-primary-1000 border-r border-primary-900 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-200 ease-in-out z-40 mt-16 md:mt-0`} // اضافه کردن mt-16 برای موبایل
      >
        <ul className='flex flex-col gap-2 h-full text-lg'>
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                className={`py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200`}
                href={link.href}
                onClick={() => setIsOpen(false)}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
          <li className='mt-auto'>
            <SignOutButton />
          </li>
        </ul>
      </nav>

      {/* Overlay for Mobile (Close Menu on Click) */}
      {isOpen && (
        <div
          className='md:hidden fixed inset-0 bg-black bg-opacity-50 z-30'
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default SideNavigation;