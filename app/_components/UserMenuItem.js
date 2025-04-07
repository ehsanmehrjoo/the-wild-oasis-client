'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function UserMenuItem() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    async function getSession() {
      const res = await fetch('/api/session');
      const data = await res.json();
      setSession(data.session);
    }
    getSession();
  }, []);

  return (
    <Link
      href="/account"
      className="hover:text-accent-400 transition-colors flex items-center gap-2"
    >
      {session?.user?.image && (
        <img
          className="h-8 w-8 rounded-full object-cover"
          src={session.user.image}
          alt={session.user.name}
        />
      )}
      <span>Guest area</span>
    </Link>
  );
}
