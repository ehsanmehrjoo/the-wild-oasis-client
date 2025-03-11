import { UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

function CabinCard({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;
  const discountedPrice = discount > 0 ? regularPrice - discount : regularPrice;
  const discountPercentage = discount > 0 ? Math.round((discount / regularPrice) * 100) : 0;

  return (
    <article className="flex flex-col w-full max-w-md mx-auto bg-primary-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
      {/* Image Section */}
      <div className="relative h-96 w-full">
        <Image
          src={image}
          fill
          alt={`Cabin ${name}`}
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 640px) 100vw, 33vw"
          quality={90}
          priority
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI/wNPb9D/pAAAAABJRU5ErkJggg=="
        />
        {discount > 0 && (
          <span className="absolute top-6 left-6 bg-accent-600 text-white text-lg font-semibold px-4 py-2 rounded-full shadow-md">
            {discountPercentage}% OFF
          </span>
        )}
      </div>

      {/* Content Section */}
      <div className="p-8 flex flex-col items-center text-center">
        <h3 className="text-accent-400 font-semibold text-3xl mb-6 tracking-wide">
          Cabin {name}
        </h3>

        <div className="flex items-center gap-3 mb-6">
          <UsersIcon className="h-8 w-8 text-primary-300" aria-hidden="true" />
          <p className="text-primary-300 text-xl">
            Up to <span className="font-bold">{maxCapacity}</span> guests
          </p>
        </div>

        <p className="text-4xl font-bold text-white mb-8">
          ${discountedPrice}
          {discount > 0 && (
            <span className="text-primary-600 line-through text-xl ml-3">
              ${regularPrice}
            </span>
          )}
          <span className="text-primary-300 text-lg block mt-2">/ night</span>
        </p>

        <Link
          href={`/cabins/${id}`}
          className="w-full py-4 bg-primary-800 text-accent-400 font-semibold text-lg rounded-xl hover:bg-accent-600 hover:text-white transition-all duration-200 text-center"
        >
          View Details & Book →
        </Link>
      </div>
    </article>
  );
}

export default CabinCard;