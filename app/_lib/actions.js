"use server"

import { auth, signIn, signOut } from "@/app/_lib/auth"
import { supabase } from "./supabase"
import { revalidatePath } from "next/cache"
import { getBookings } from "./data-service"

export async function updateProfile(formData) {
   const session = await auth()
   if(!session) throw new Error("You must be logged in")
    const nationalID = formData.get("nationalID")
   const [nationality, countryFlag] = formData.get("nationality").split("%")
   if(!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) throw new Error("Please provide a valid national ID")
    const updatedData = {nationality, countryFlag ,nationalID}
 
const { data, error } = await supabase
.from('guests')
.update(updatedData)
.eq('id', session.user.guestId)
 

if (error) {
throw new Error('Guest could not be updated');
}
revalidatePath("/account/profile")
}

export async function deleteReservation(bookingId){
    const session = await auth()
    if(!session) throw new Error("You must be logged in")

        const guestBooking = await  getBookings(session.user.guestId)
        const guestBookingIds = guestBooking.map(booking => booking.id)
        if(!guestBookingIds.includes(bookingId)) throw new Error("You are not allowed to delete this booking")
        const {  error } = await supabase.from('bookings').delete().eq('id', bookingId);

    if (error) {
      console.error(error);
      throw new Error('Booking could not be deleted');
    }
    revalidatePath("/account/reservations")
}

export async function signInAction(){
    await signIn("google", {redirectTo : "/account"})
}
 