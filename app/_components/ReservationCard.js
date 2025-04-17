import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { format, formatDistance, isPast, isToday, parseISO } from 'date-fns';
import DeleteReservation from '@/app/_components/DeleteReservation';
import Image from 'next/image';
import Link from 'next/link';

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace('about ', '');

function ReservationCard({ booking }) {
  const {
    id,
    guestId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    status,
    created_at,
    cabins: { name, image },
  } = booking;

  return (
    <div className="flex flex-col md:flex-row border border-primary-800 mb-4 rounded-xl shadow-md bg-primary-900 transition-all duration-300 hover:shadow-lg">
      {/* بخش تصویر */}
      <div className="relative w-full md:w-40 md:h-40 h-56">
        <Image
          src={image}
          alt={`Cabin ${name}`}
          fill
          className="object-cover rounded-t-xl md:rounded-t-none md:rounded-l-xl border-b md:border-b-0 md:border-r border-primary-800"
          sizes="(max-width: 768px) 100vw, 160px"
          priority
        />
      </div>

      {/* بخش اطلاعات رزرو */}
      <div className="flex-grow px-4 py-4 md:px-6 md:py-3 flex flex-col">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-base md:text-lg lg:text-xl font-semibold leading-tight">
            {numNights} nights in Cabin {name}
          </h3>
          {isPast(new Date(startDate)) ? (
            <span className="bg-yellow-800 text-yellow-200 h-6 px-2 uppercase text-xs font-bold flex items-center rounded-sm shrink-0">
              past
            </span>
          ) : (
            <span className="bg-green-800 text-green-200 h-6 px-2 uppercase text-xs font-bold flex items-center rounded-sm shrink-0">
              upcoming
            </span>
          )}
        </div>

        <p className="text-sm md:text-base lg:text-lg text-primary-300 mt-1 md:mt-2">
          {format(new Date(startDate), 'EEE, MMM dd yyyy')} (
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}
          ) — {format(new Date(endDate), 'EEE, MMM dd yyyy')}
        </p>

        <div className="flex flex-wrap gap-2 md:gap-4 mt-auto items-baseline text-sm md:text-base">
          <p className="text-lg md:text-xl font-semibold text-accent-400">
            ${totalPrice}
          </p>
          <p className="text-primary-300">•</p>
          <p className="text-primary-300">
            {numGuests} guest{numGuests > 1 && 's'}
          </p>
          <p className="ml-auto text-xs md:text-sm text-primary-400">
            Booked {format(new Date(created_at), 'EEE, MMM dd yyyy, p')}
          </p>
        </div>
      </div>

      {/* بخش دکمه‌ها */}
      {!isPast(startDate) && (
        <div className="flex md:flex-col border-t md:border-t-0 md:border-l border-primary-800">
          <Link
            href={`/account/reservations/edit/${id}`}
            className="group flex items-center justify-center gap-2 uppercase text-xs font-bold text-primary-300 border-b md:border-b border-primary-800 flex-grow px-3 py-2 hover:bg-accent-600 transition-colors hover:text-primary-900 focus:outline-none focus:ring-2 focus:ring-accent-500"
            aria-label={`Edit reservation for cabin ${name}`}
          >
            <PencilSquareIcon className="h-4 w-4 md:h-5 md:w-5 text-primary-600 group-hover:text-primary-800 transition-transform group-hover:scale-110" />
            <span>Edit</span>
          </Link>
          <DeleteReservation bookingId={id} />
        </div>
      )}
    </div>
  );
}

export default ReservationCard;