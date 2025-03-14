import { getCabin, getCabins } from "@/app/_lib/data-service";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

// تولید متادیتا برای صفحه
export async function generateMetadata({ params }) {
  try {
    const { name } = await getCabin(params.cabinId); // اصلاح تایپو: cabinId
    return { title: `Cabin ${name}` };
  } catch (error) {
    console.error("Error in generateMetadata:", error);
    return { title: "Cabin Not Found" };
  }
}

// تولید پارامترهای استاتیک برای مسیرها
export async function generateStaticParams() {
  try {
    const cabins = await getCabins();
    const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
    return ids;
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [];
  }
}

// کامپوننت اصلی صفحه
export default async function Page({ params }) {
  try {
    const cabin = await getCabin(params.cabinId);

    // بررسی وجود کابین
    if (!cabin || !cabin.id) {
      return (
        <div className="max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-semibold text-accent-100">Cabin not found</h2>
        </div>
      );
    }

    const { id, name, maxCapacity, regularPrice, discount, image, description } = cabin;
    const discountedPrice = discount > 0 ? regularPrice - discount : regularPrice;
    const discountPercentage = discount > 0 ? Math.round((discount / regularPrice) * 100) : 0;

    return (
      <div className="max-w-7xl mx-auto mt-16 px-4 sm:px-6 lg:px-8">
        {/* بخش اصلی */}
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
              {description || "No description available."} {/* متن پیش‌فرض */}
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

        {/* فراخوان به اقدام */}
        <div className="mt-16 md:mt-24 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-accent-100 px-6 py-3 bg-primary-900 rounded-xl inline-block shadow-lg hover:shadow-xl transition-all duration-300 mb-6">
            Reserve today. Pay on arrival.
          </h2>
          <Link
            href={`/cabins/${id}/book`}
            className="inline-block px-8 py-4 bg-accent-600 text-white text-lg font-semibold rounded-xl hover:bg-accent-700 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-primary-950"
          >
            Book Now
          </Link>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in Page component:", error);
    return (
      <div className="max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-semibold text-accent-100">Error loading cabin</h2>
        <p className="text-primary-300 mt-2">{error.message}</p>
      </div>
    );
  }
}