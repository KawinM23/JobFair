"use client";

import { addBooking } from "@/libs/api/booking";
import { AddBookingInterface } from "@/libs/interface/booking";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BookingForm({
  companyId,
  session,
}: {
  companyId: string;
  session: Session | null;
}) {
  const router = useRouter();
  const [bookData, setBookData] = useState<AddBookingInterface>({
    bookingDate: new Date(),
    createdAt: new Date(),
  });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await addBooking(
        companyId,
        bookData,
        session?.user.token ?? ""
      );
      if (res.success) {
        router.push("/mybooking");
      } else {
        alert("You already have 3 bookings!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-5">
      <h2 className="text-2xl font-semibold">Book your reservation</h2>
      <form
        className="flex flex-row gap-2 items-center mt-2"
        onSubmit={onSubmit}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
          <DatePicker
            value={dayjs(bookData.bookingDate)}
            onChange={(value) => {
              if (value != null)
                setBookData({ ...bookData, bookingDate: value.toDate() });
            }}
            className="bg-white"
            slotProps={{ textField: { size: "small" } }}
          />
        </LocalizationProvider>
        <button className="blue-button">Book</button>
      </form>
    </div>
  );
}
