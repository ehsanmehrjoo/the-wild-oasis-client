import { Josefin_Sans } from "next/font/google";
import "@/app/_styles/globals.css";
import Header from "./_components/Header";

// Define the Josefin Sans font with optimized settings
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "600", "700"], // Specify weights for better control
  variable: "--font-josefin", // CSS variable for advanced usage
});

// Metadata for SEO and better page indexing
export const metadata = {
  title: {
    template: "%s | The Wild Oasis",
    default: "Welcome to The Wild Oasis",
  },
  description:
    "Discover luxurious cabin hotels in the heart of the Italian Dolomites, surrounded by stunning mountains and serene dark forests. Perfect for a peaceful getaway.",
  keywords: ["luxury cabins", "Italian Dolomites", "nature retreat", "vacation", "The Wild Oasis"],
  openGraph: {
    title: "The Wild Oasis - Luxury Cabins in the Italian Dolomites",
    description:
      "Experience luxury and nature at The Wild Oasis, nestled in the Italian Dolomites with breathtaking mountain views.",
    images: ["/og-image.jpg"], // Add an image for social sharing
    url: "https://thewild-oasis.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Wild Oasis",
    description:
      "Luxury cabins in the Italian Dolomites, surrounded by mountains and forests.",
    image: "/og-image.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${josefin.className} ${josefin.variable} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative overflow-x-hidden`}
      >
        {/* Header */}
        <Header />

        {/* Main Content */}
        <div className="flex-1 px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-16 grid">
          <main className="max-w-7xl mx-auto w-full">{children}</main>
        </div>

        {/* Footer */}
        <footer className="bg-primary-900 py-6 text-center text-primary-300 border-t border-primary-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm sm:text-base">
              &copy; {new Date().getFullYear()} The Wild Oasis. All rights reserved.
            </p>
            <div className="mt-4 flex justify-center gap-6">
              <a
                href="https://twitter.com/thewildoasis"
                className="text-primary-400 hover:text-accent-500 transition-colors duration-200"
                aria-label="Follow us on Twitter"
              >
                Twitter
              </a>
              <a
                href="https://instagram.com/thewildoasis"
                className="text-primary-400 hover:text-accent-500 transition-colors duration-200"
                aria-label="Follow us on Instagram"
              >
                Instagram
              </a>
              <a
                href="/contact"
                className="text-primary-400 hover:text-accent-500 transition-colors duration-200"
                aria-label="Contact us"
              >
                Contact
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}