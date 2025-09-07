"use client"
import { XMarkIcon } from '@heroicons/react/24/solid';
import { format } from 'date-fns';
import { useReservation } from './ReservationContext';
import { useState, useEffect } from 'react';

function ReservationReminder() {
  const { range, resetRange } = useReservation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (range.from && range.to) {
      setShow(true);

      // بعد از 5 ثانیه خودکار ناپدید شود
      const timer = setTimeout(() => {
        setShow(false);
      }, 20000);

      return () => clearTimeout(timer);
    }
  }, [range]);

  if (!range.from || !range.to) return null;

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 py-3 px-6 sm:py-4 sm:px-7 md:py-5 md:px-8 rounded-full 
        bg-accent-500 text-primary-800 font-semibold shadow-xl shadow-slate-900 flex gap-4 sm:gap-6 md:gap-8 items-center
        max-w-[90%] md:max-w-[80%] transition-all duration-300
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"}`}
    >
      <p className='text-sm sm:text-base md:text-lg'>
        <span>👋</span> Don&apos;t forget to reserve your dates <br />
        from {format(new Date(range.from), 'MMM dd yyyy')} to {format(new Date(range.to), 'MMM dd yyyy')}
      </p>
      <button
        className='rounded-full p-1 hover:bg-accent-600 transition-all'
        onClick={() => setShow(false)}
      >
        <XMarkIcon className='h-4 w-4 sm:h-5 sm:w-5' />
      </button>
    </div>
  );
}

export default ReservationReminder;
