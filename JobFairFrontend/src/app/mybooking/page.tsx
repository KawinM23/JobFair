"use client";

import { getMyBooking } from "@/libs/api/booking";
import { BookingInterface } from "@/libs/interface/booking";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function page() {
  const { data: session } = useSession();
  const [allBookings, setAllBookings] = useState<BookingInterface[] | null>(
    null
  );
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMyBooking(session?.user.token ?? "");
      if (res.data != null) {
        setAllBookings(res.data);
      }
    };

    fetchData();

    return () => {};
  }, [refresh]);

  return (
    <main className="py-5 px-10">
      <h1>My booking</h1>
      <div className="flex flex-col gap-2 mt-5">
        {allBookings ? (
          allBookings.map((booking) => {
            return <BookingTab booking={booking} key={booking._id} />;
          })
        ) : (
          <div>No Booking Yet!</div>
        )}
      </div>
    </main>
  );
}

function BookingTab({ booking }: { booking: BookingInterface }) {
  return (
    <div className="w-full bg-secondary-100 rounded-xl p-2 flex justify-between items-center">
      <Link href={"/company/" + booking.company.id} className="text-xl">
        {booking.company.name}
      </Link>
      <p className="text-xl">{new Date(booking.bookingDate).toUTCString()}</p>
      <span className="flex gap-4">
        <button className="text-white rounded-lg px-2 py-1 text-xl bg-blue-500">
          Edit
        </button>
        <button className="text-white rounded-lg px-2 py-1 text-xl bg-red-500">
          Delete
        </button>
      </span>
    </div>
  );
}
