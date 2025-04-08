import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

function SignOutButton() {
  return (
    <Link to="/api/auth/signout" className='py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full'>
      <ArrowRightOnRectangleIcon className='h-5 w-5 text-primary-600' />
      <span>Sign out</span>
    </Link>
  );
}

export default SignOutButton;
