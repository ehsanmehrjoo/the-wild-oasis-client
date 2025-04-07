
'use client';

import Link from "next/link";

export default function UserMenuItem({ session }) {
  return (
    <Link
      href="/account"
      className="hover:text-accent-400 transition-colors flex items-center gap-4"
    >
      {session?.user?.image && (
        <img
          className="h-8 w-8 rounded-full object-cover"
          src={session.user.image}
          alt={session.user.name}
          referrerPolicy="no-referrer"
        />
      )}
      <span>Guest area</span>
    </Link>
  );
}
