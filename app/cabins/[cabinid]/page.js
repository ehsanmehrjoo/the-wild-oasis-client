import { getCabin } from "@/app/_lib/data-service";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinid);
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;
  console.log(params);

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-[3fr_4fr] gap-8 md:gap-20 border border-primary-800 py-3 px-6 md:px-10 mb-12 md:mb-24">
        <div className="relative w-full h-[300px] md:h-auto md:scale-[1.15] md:-translate-x-3">
          <Image
            className="object-cover"
            fill
            src={image}
            alt={`Cabin ${name}`}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="mt-6 md:mt-0">
          <h3 className="text-accent-100 font-black text-4xl md:text-7xl mb-5 md:mb-5 bg-primary-950 p-4 md:p-6 pb-1 w-full md:w-[150%] md:translate-x-[-254px]">
            Cabin {name}
          </h3>

          <p className="text-base md:text-lg text-primary-300 mb-8 md:mb-10">
            {description}
          </p>

          <ul className="flex flex-col gap-4 mb-7">
            <li className="flex gap-3 items-center">
              <UsersIcon className="h-5 w-5 text-primary-600 flex-shrink-0" />
              <span className="text-base md:text-lg">
                For up to <span className="font-bold">{maxCapacity}</span>{" "}
                guests
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <MapPinIcon className="h-5 w-5 text-primary-600 flex-shrink-0" />
              <span className="text-base md:text-lg">
                Located in the heart of the{" "}
                <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <EyeSlashIcon className="h-5 w-5 text-primary-600 flex-shrink-0" />
              <span className="text-base md:text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-3xl md:text-5xl font-semibold text-center px-4">
          Reserve today. Pay on arrival.
        </h2>
      </div>
    </div>
  );
}