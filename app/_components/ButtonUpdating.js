"use client"
import { useNavigation } from "react-day-picker";
import { useFormStatus } from "react-dom"

export function ButtonUpdating(){
    const { pending } = useFormStatus();
    const navigation = useNavigation

   return <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
   {pending  ? "Updating..." :"Update reservation"}
 </button>
}