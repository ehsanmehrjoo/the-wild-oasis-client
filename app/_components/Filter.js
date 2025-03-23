"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get('capacity');

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    if (filter === "all") {
      params.delete("capacity"); // حذف پارامتر برای حالت all
    } else {
      params.set("capacity", filter);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      <Button filter="all" handleFilter={handleFilter} activeFilter={activeFilter}>All cabins</Button>
      <Button filter="small" handleFilter={handleFilter} activeFilter={activeFilter}>1&mdash;3 guests</Button>
      <Button filter="medium" handleFilter={handleFilter} activeFilter={activeFilter}>4&mdash;7 guests</Button>
      <Button filter="large" handleFilter={handleFilter} activeFilter={activeFilter}>8&mdash;12 guests</Button>
    </div>
  );
}

function Button({ filter, handleFilter, activeFilter, children }) {
  const isActive = (filter === "all" && !activeFilter) || activeFilter === filter;

  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${isActive ? "bg-primary-700 text-primary-50" : ""}`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;
