"use client";

import { useQuery } from '@tanstack/react-query';
 
import CabinCard from "@/app/_components/CabinCard";

async function fetchCabins() {
  const res = await fetch('/api/cabins');
  if (!res.ok) throw new Error('Failed to fetch cabins');
  return res.json();
}

function CabinList() {
  const { data: cabins, error, isLoading } = useQuery(['cabins'], fetchCabins, {
    refetchInterval: 5000 // آپدیت هر 5 ثانیه
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!cabins?.length) return <p>No cabins available.</p>;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {cabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}