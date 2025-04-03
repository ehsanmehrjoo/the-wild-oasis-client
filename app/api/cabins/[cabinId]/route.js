import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";
import { cache } from "react";

// Memoize data fetching for better performance
const getCabinCached = cache(getCabin);
const getBookedDatesByCabinIdCached = cache(getBookedDatesByCabinId);

export async function GET(request, { params }) {
  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabinCached(cabinId),
      getBookedDatesByCabinIdCached(cabinId),
    ]);

    return Response.json({ cabin, bookedDates });
  } catch (error) {
    return Response.json({ message: "Cabin not found" } );
  }
}
