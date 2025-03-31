"use client"
import { isWithinInterval } from "date-fns";
import { useContext, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ bookedDates, cabin, settings }) {
const {range, setRange , resetRange} = useReservation()

  // اطلاعات قیمت و تخفیف
  const regularPrice = cabin?.regularPrice || 0;
  const discount = cabin?.discount || 0;
  const numNights = range.from && range.to 
    ? Math.ceil((range.to - range.from) / (1000 * 60 * 60 * 24)) 
    : 0;
  const cabinPrice = numNights * (regularPrice - discount);

  // تنظیمات
  const { minBookingLength = 1, maxBookingLength = 30 } = settings;

 
 

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        onSelect={setRange}
        selected={range}
        modifiersClassNames={{
    selected: "bg-accent-600 ",  // تغییر رنگ دایره انتخاب‌شده
    range_middle: "bg-accent-400", // تغییر رنگ پس‌زمینه بازه انتخابی
  }}
        disabled={{ before: new Date() }}
        fromMonth={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
      />

      <div className="flex items-center justify-between px-8 bg-accent-500  text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span>/night</span>
          </p>
          {numNights > 0 && (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          )}
        </div>

        {(range.from || range.to) && (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

export default DateSelector;
