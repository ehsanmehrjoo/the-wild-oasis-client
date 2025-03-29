import { EyeSlashIcon } from '@heroicons/react/24/solid';
 
import { MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from 'next/image';
import TextExpander from './TextExpander';

function Cabin({cabin}) {
    const { id, name, maxCapacity, regularPrice, discount, image, description } = cabin;
    const discountedPrice = discount > 0 ? regularPrice - discount : regularPrice;
    const discountPercentage = discount > 0 ? Math.round((discount / regularPrice) * 100) : 0;
  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-6 md:gap-16 border border-primary-800 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-primary-950 to-primary-900 py-8 md:py-12 px-6 md:px-12 transition-all duration-500">
          {/* بخش تصویر */}
          <div className="relative w-full h-[350px] sm:h-[450px] lg:h-[550px] md:scale-[1.25] md:-translate-x-8 group">
            <Image
              className="object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
              fill
              src={image || "/fallback-image.jpg"} // تصویر پیش‌فرض
              alt={`Cabin ${name}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 40vw"
              priority
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI/wNPb9D/pAAAAABJRU5ErkJggg=="
              quality={90}
            />
            {discount > 0 && (
              <span className="absolute top-6 left-6 bg-accent-600 text-white text-sm sm:text-base font-semibold px-4 py-2 rounded-full shadow-lg">
                {discountPercentage}% OFF
              </span>
            )}
          </div>

          {/* بخش محتوا */}
          <div className="flex flex-col justify-center mt-8 md:mt-0">
            <h3
              id={`cabin-${id}-title`}
              className="text-accent-100 font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 bg-primary-900 p-4 md:p-6 rounded-lg shadow-inner w-full md:w-[140%] md:-translate-x-16 tracking-tight"
            >
              Cabin {name}
            </h3>

            <p className="text-base sm:text-lg md:text-xl text-primary-200 mb-8 md:mb-12 leading-relaxed tracking-wide">
              <TextExpander>{description || "No description available."}</TextExpander>
              
            </p>

            <ul className="flex flex-col gap-6 mb-10">
              <li className="flex gap-4 items-center">
                <UsersIcon className="h-7 w-7 text-primary-600 flex-shrink-0" aria-hidden="true" />
                <span className="text-base sm:text-lg md:text-xl text-primary-300">
                  For up to <span className="font-bold">{maxCapacity}</span> guests
                </span>
              </li>
              <li className="flex gap-4 items-center">
                <MapPinIcon className="h-7 w-7 text-primary-600 flex-shrink-0" aria-hidden="true" />
                <span className="text-base sm:text-lg md:text-xl text-primary-300">
                  Located in the heart of the{" "}
                  <span className="font-bold">Dolomites</span> (Italy)
                </span>
              </li>
              <li className="flex gap-4 items-center">
                <EyeSlashIcon className="h-7 w-7 text-primary-600 flex-shrink-0" aria-hidden="true" />
                <span className="text-base sm:text-lg md:text-xl text-primary-300">
                  Privacy <span className="font-bold">100%</span> guaranteed
                </span>
              </li>
            </ul>

            <div className="flex items-center gap-4 justify-start">
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                ${discountedPrice}
                {discount > 0 && (
                  <span className="text-primary-600 line-through text-lg sm:text-xl ml-3">
                    ${regularPrice}
                  </span>
                )}
                <span className="text-primary-300 text-sm sm:text-base block mt-1">/ night</span>
              </span>
            </div>
          </div>
        </div>
  )
}

export default Cabin