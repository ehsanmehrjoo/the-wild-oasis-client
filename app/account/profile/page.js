import SelectCountry from "@/app/_components/SelectCountry";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import Image from "next/image";

export const metadata = {
  title: "Update Profile",
};

export default function Page() {
  // CHANGE
  // const countryFlag = "pt.jpg";
  const nationality = "portugal";

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <h2 className="font-semibold text-2xl sm:text-3xl text-accent-400 mb-6 tracking-wide">
        Update Your Guest Profile
      </h2>

      <p className="text-base sm:text-lg text-primary-200 mb-10 leading-relaxed">
        Providing the following information will make your check-in process faster and smoother. See you soon!
      </p>

      <UpdateProfileForm>
      <SelectCountry
            name="nationality"
            id="nationality"
            className="px-6 py-3 bg-primary-200 text-primary-800 w-full rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-opacity-50"
            defaultCountry={nationality}
          />
      </UpdateProfileForm>
    </div>
  );
}