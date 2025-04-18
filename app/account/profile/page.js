import SelectCountry from "@/app/_components/SelectCountry";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import { auth } from "@/app/_lib/auth";
import { getGuest } from "@/app/_lib/data-service";

export const metadata = {
  title: "Update Profile",
};

export default async function Page() {
  const session = await auth();
  console.log(session);
  const guest = await getGuest(session.user.email);

  return (
    <div className="max-w-3xl mx-auto mt-8 sm:mt-12 px-4 sm:px-6 lg:px-8">
      {/* هدر صفحه */}
      <div className="text-center sm:text-left mb-8 sm:mb-12">
        <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-accent-400 mb-4 sm:mb-6 tracking-wide transition-all duration-300">
          Update Your Guest Profile
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-primary-200 leading-relaxed max-w-2xl mx-auto sm:mx-0">
          Providing the following information will make your check-in process faster and smoother. See you soon!
        </p>
      </div>

      {/* فرم به‌روزرسانی */}
      <div className="bg-primary-900 p-6 sm:p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
        <UpdateProfileForm guest={guest}>
          <SelectCountry
            name="nationality"
            id="nationality"
            className="px-4 sm:px-6 py-3 bg-primary-200 text-primary-800 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-opacity-50 transition-all duration-200"
            defaultCountry={guest.nationality}
            aria-label="Select your nationality"
          />
        </UpdateProfileForm>
      </div>
    </div>
  );
}