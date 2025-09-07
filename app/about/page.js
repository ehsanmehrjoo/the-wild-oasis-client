import Link from "next/link";
import Image from "next/image";
import image1 from "@/public/about-1.jpg";
import image2 from "@/public/about-2.jpg";
import { getCabins } from "../_lib/data-service";

export const revalidate = 3600
export const metadata = {
  title: "About | The Wild Oasis",
};

 async function Page() {
  
  const cabins = await getCabins();
  return (
    <div className="max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 text-base sm:text-lg lg:text-xl items-start">
        {/* Left Text Section */}
        <div className="col-span-1 md:col-span-3 order-1">
          <h1 className="text-4xl sm:text-5xl md:text-6xl mb-8 text-accent-400 font-medium tracking-tight">
            Welcome to The Wild Oasis
          </h1>

          <div className="space-y-6">
            <p className="text-primary-200 leading-relaxed">
              Where nature&apos;s beauty and comfortable living blend seamlessly.
              Hidden away in the heart of the Italian Dolomites, this is your
              paradise away from home. But it&apos;s not just about the luxury
              cabins. It&apos;s about the experience of reconnecting with nature and
              enjoying simple pleasures with family.
            </p>
            <p className="text-primary-200 leading-relaxed">
              Our {cabins.length} luxury cabins provide a cozy base, but the real freedom and
              peace you&apos;ll find in the surrounding mountains. Wander through
              lush forests, breathe in the fresh air, and watch the stars
              twinkle above from the warmth of a campfire or your hot tub.
            </p>
            <p className="text-primary-200 leading-relaxed">
              This is where memorable moments are made, surrounded by nature&apos;s
              splendor. It&apos;s a place to slow down, relax, and feel the joy of
              being together in a beautiful setting.
            </p>
          </div>
        </div>

        {/* First Image */}
        <div className="col-span-1 md:col-span-2 order-2 md:order-1">
          <Image
            src={image1}
            placeholder="blur"
            quality={85} // Reduced for better performance
            alt="Family sitting around a fire pit in front of cabin"
            className="rounded-xl shadow-lg object-cover w-full h-auto"
          />
        </div>

        {/* Second Image */}
        <div className="col-span-1 md:col-span-2 order-3">
          <Image
            src={image2}
            placeholder="blur"
            quality={85} // Reduced for better performance
            alt="Family that manages The Wild Oasis"
            className="rounded-xl shadow-lg object-cover w-full h-auto"
          />
        </div>

        {/* Right Text Section */}
        <div className="col-span-1 md:col-span-3 order-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl mb-8 text-accent-400 font-medium tracking-tight">
            Managed by our family since 1962
          </h1>

          <div className="space-y-6">
            <p className="text-primary-200 leading-relaxed">
              Since 1962, The Wild Oasis has been a cherished family-run
              retreat. Started by our grandparents, this haven has been nurtured
              with love and care, passing down through our family as a testament
              to our dedication to creating a warm, welcoming environment.
            </p>
            <p className="text-primary-200 leading-relaxed">
              Over the years, we&apos;ve maintained the essence of The Wild Oasis,
              blending the timeless beauty of the mountains with the personal
              touch only a family business can offer. Here, you&apos;re not just a
              guest; you&apos;re part of our extended family. So join us at The Wild
              Oasis soon, where tradition meets tranquility, and every visit is
              like coming home.
            </p>

            <div className="mt-8">
              <Link
                href="/cabins"
                className="inline-block bg-accent-500 px-6 py-3 sm:px-8 sm:py-4 text-primary-800 text-lg font-semibold rounded-lg shadow-md hover:bg-accent-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-400"
              >
                Explore our luxury cabins
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;