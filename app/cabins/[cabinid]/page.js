import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import ReviewForm from "@/app/_components/ReviewForm";
import ReviewList from "@/app/_components/ReviewList";
import Spinner from "@/app/_components/Spinner";
import { auth } from "@/app/_lib/auth";
import { getCabin, getCabins, getReviews } from "@/app/_lib/data-service";
import { Suspense } from "react";

export const revalidate = 3600;

// متادیتا برای SEO
export async function generateMetadata({ params }) {
  try {
    const { name } = await getCabin(params.cabinId);
    return { title: `Cabin ${name}` };
  } catch (error) {
    console.error("Error in generateMetadata:", error);
    return { title: "Cabin Not Found" };
  }
}

// مسیرهای استاتیک
export async function generateStaticParams() {
  try {
    const cabins = await getCabins();
    return cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [];
  }
}

// صفحه اصلی
export default async function Page({ params }) {
  try {
    const session = await auth();
    const cabin = await getCabin(params.cabinId);

    if (!cabin || !cabin.id) {
      return (
        <div className="max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-semibold text-accent-100">Cabin not found</h2>
        </div>
      );
    }

    const reviews = await getReviews(cabin.id);

    return (
      <div className="max-w-7xl mx-auto mt-16 px-4 sm:px-6 lg:px-8">
        {/* اطلاعات کابین */}
        <Cabin cabin={cabin} />

        {/* فرم رزرو و نظر */}
        <div className="mt-16 md:mt-24 text-center">
          <h2 className="text-5xl font-semibold mb-10 text-accent-400">
            Reserve {cabin.name} today. Pay on arrival.
          </h2>

          <Suspense fallback={<Spinner />}>
            <Reservation cabin={cabin} />
            {session?.user ? (
              <ReviewForm cabinId={cabin.id} session={session} />
            ) : (
              <div className="text-center mt-10 text-primary-300">
                <p>You must be logged in to leave a review.</p>
              </div>
            )}

            {/* لیست نظرات */}
            <ReviewList reviews={reviews} />
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
