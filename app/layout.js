
import {Josefin_Sans} from "next/font/google"
 const josefun = Josefin_Sans({
  subsets : ["latin"],
  display : "swap",
  
})
console.log(josefun);
import "@/app/_styles/globals.css"
import Header from "./_components/Header";
export const metadata = {
  title : {
    template: "%s / The Wild Oasis",
    default: "Welcome  / The Wild Oasis",
  } ,
  description: "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
 
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${josefun.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}>
        <Header /> 
        <div className="flex-1 px-4 md:px-8 py-6 md:py-12 grid">

          <main className="max-w-7xl mx-auto w-full">
            {children}
          </main>

        </div>
        {/* <footer>Copyright by The Wild Oasis</footer> */}
      </body>
    </html>
  );
}
