"use client"
import { XMarkIcon } from '@heroicons/react/24/solid';
import { format } from 'date-fns';
import { useReservation } from './ReservationContext';

function ReservationReminder() {
  const { range, resetRange } = useReservation();

  if (!range.from || !range.to) return null;

  return (
    <div className='fixed bottom-6 left-1/2 -translate-x-1/2 py-3 px-6 sm:py-4 sm:px-7 md:py-5 md:px-8 rounded-full bg-accent-500 text-primary-800 font-semibold shadow-xl shadow-slate-900 flex gap-4 sm:gap-6 md:gap-8 items-center max-w-[90%] md:max-w-[80%]'>
      <p className='text-sm sm:text-base md:text-lg'>
        <span>👋</span> Don&apos;t forget to reserve your dates <br /> from{' '}
        {format(new Date(range.from), 'MMM dd yyyy')} to{' '}
        {format(new Date(range.to), 'MMM dd yyyy')}
      </p>
      <button className='rounded-full p-1 hover:bg-accent-600 transition-all' onClick={resetRange}>
        <XMarkIcon className='h-4 w-4 sm:h-5 sm:w-5' />
      </button>
    </div>
  );
}

export default ReservationReminder;