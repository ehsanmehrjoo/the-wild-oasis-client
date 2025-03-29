import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";

export const revalidate = 3600;
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
  // console.log(params);
  try {
    const cabin = await getCabin(params.cabinId);
    // const settings = await getSettings();
    // const bookedDates = await getBookedDatesByCabinId(params.cabinId)

    // بررسی وجود کابین
    if (!cabin || !cabin.id) {
      return (
        <div className="max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-semibold text-accent-100">Cabin not found</h2>
        </div>
      );
    }



    return (
      <div className="max-w-7xl mx-auto mt-16 px-4 sm:px-6 lg:px-8">
        {/* بخش اصلی */}
        <Cabin cabin={cabin}/>

        {/* فراخوان به اقدام */}
        <div className="mt-16 md:mt-24 text-center">
          <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
            Reserve {cabin.name} today. Pay on arrival.
          </h2>
          <Suspense fallback={<Spinner />}>
          <Reservation  cabin={cabin}/>
          </Suspense>
        
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