"use client";

import { getMyBooking } from "@/libs/api/booking";
import { BookingInterface } from "@/libs/interface/booking";

import { useSession } from "next-auth/react";
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
      <div className="flex">
        {allBookings?.map((booking) => {
          return <div>{booking.company.name}</div>;
        })}
      </div>
    </main>
  );
}
