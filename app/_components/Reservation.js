import React from 'react';
import DateSelector from './DateSelector';
import ReservationForm from './ReservationForm';
import { getBookedDatesByCabinId, getSettings } from '../_lib/data-service';

async function Reservation({ cabin }) {
  try {
    const [settings, bookedDates] = await Promise.all([
      getSettings(),
      getBookedDatesByCabinId(cabin.id),
    ]);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 border border-primary-800 rounded-lg overflow-hidden shadow-xl bg-gradient-to-br from-primary-950 to-primary-900 min-h-[800px]">
        {/* تاریخ انتخاب‌کننده */}
        <div className="p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold text-accent-100 mb-4">Select Your Dates</h2>
          <DateSelector bookedDates={bookedDates} cabin={cabin} settings={settings} />
        </div>

        {/* فرم رزرو */}
        <div className="p-8 flex flex-col justify-center bg-primary-800">
          <h2 className="text-3xl font-semibold text-white mb-4">Reservation Details</h2>
          <ReservationForm cabin={cabin}  />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in Reservation component:', error);
    return <p className="text-red-500">Error loading reservation details. Please try again later.</p>;
  }
}

export default Reservation;
