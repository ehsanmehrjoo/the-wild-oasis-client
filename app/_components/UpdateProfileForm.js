"use client"
import Image from 'next/image'
import React from 'react'
import { updateProfile } from '../_lib/actions'
import { useFormStatus } from 'react-dom'
import SpinnerMini from './SpinnerMini'
 

function UpdateProfileForm({guest , children}) {
   
    const {fullName , email , nationality , nationalID , countryFlag} = guest

  return (
    <form action={updateProfile} className="bg-primary-900 py-10 px-8 sm:px-12 rounded-2xl shadow-lg border border-primary-800 flex flex-col gap-8">
        <div className="space-y-3">
          <label className="block text-primary-100 font-medium text-sm sm:text-base">
            Full Name
          </label>
          <input
            disabled
            defaultValue={fullName}
            name='fullName'
            className="px-6 py-3 bg-primary-200 text-primary-800 w-full rounded-lg shadow-md disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-opacity-50"
          />
        </div>

        <div className="space-y-3">
          <label className="block text-primary-100 font-medium text-sm sm:text-base">
            Email Address
          </label>
          <input
            disabled
            defaultValue={email}
            name='email'
            className="px-6 py-3 bg-primary-200 text-primary-800 w-full rounded-lg shadow-md disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-opacity-50"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="nationality" className="block text-primary-100 font-medium text-sm sm:text-base">
              Where are you from?
            </label>
            <IMage countryFlag={countryFlag} />


          </div>
         {children}
        </div>

        <div className="space-y-3">
          <label htmlFor="nationalID" className="block text-primary-100 font-medium text-sm sm:text-base">
            National ID Number
          </label>
          <input
          defaultValue={nationalID}
            name="nationalID"
            className="px-6 py-3 bg-primary-200 text-primary-800 w-full rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-opacity-50"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <Button />
        </div>
      </form>
  )
}
function Button(){
  const { pending } = useFormStatus()
  return <button disabled={pending} className="bg-accent-500 px-6 sm:px-8 py-3 sm:py-4 text-primary-800 font-semibold rounded-lg shadow-md hover:bg-accent-600 transition-all duration-300 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-opacity-60">
  {pending ? "Updating..." : "Update Profile"}
</button>
}
function IMage({ countryFlag }) {
  const { pending } = useFormStatus();

  if (pending) return <SpinnerMini />;
  // if (!countryFlag) return null; // یا یه div خالی

  return  (countryFlag ? 
    <Image
      src={countryFlag}
      alt="Country flag"
      width={30}
      height={30}
      className="rounded-full border border-primary-700 object-cover"
    /> :  <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white text-xs font-semibold border border-primary-700">
       {/* می‌تونی این علامت رو به شکل یک آیکون کوچک پرچم هم تغییر بدی  */}
    </div>
  );
}

export default UpdateProfileForm