"use client";

import { deleteBooking, getMyBooking } from "@/libs/api/booking";
import {
  BookingInterface,
  AddBookingInterface,
} from "@/libs/interface/booking";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { Session } from "next-auth";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { editBooking } from "@/libs/api/booking";

import { HiPencil, HiX } from "react-icons/hi";

export default function page() {
  const { data: session } = useSession();
  const [allBookings, setAllBookings] = useState<BookingInterface[] | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMyBooking(session?.user.token ?? "");
      if (res.data != null) {
        setAllBookings(res.data);
      }
      setLoading(false);
    };

    fetchData();

    return () => {};
  }, [refresh]);

  return (
    <main className="py-5 px-10">
      <h1>My booking</h1>
      <div className="flex flex-col gap-2 mt-5">
        {loading ? (
          <></>
        ) : allBookings && allBookings.length != 0 ? (
          allBookings.map((booking) => {
            return (
              <BookingTab
                booking={booking}
                key={booking._id}
                session={session}
                setRefresh={setRefresh}
              />
            );
          })
        ) : (
          <div>No Booking Yet!</div>
        )}
      </div>
    </main>
  );
}

function BookingTab({
  booking,
  session,
  setRefresh,
}: {
  booking: BookingInterface;
  session: Session | null;
  setRefresh: Function;
}) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editBookingData, setEditBookingData] = useState<AddBookingInterface>({
    bookingDate: new Date(booking.bookingDate),
    createdAt: new Date(booking.createdAt),
  });

  const onEdit = async () => {
    try {
      const res = await editBooking(
        booking._id,
        editBookingData,
        session?.user.token ?? ""
      );
      if (res != null) {
        setOpenEditModal(false);
        setRefresh((prev: boolean) => !prev);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onDelete = async () => {
    try {
      const res = await deleteBooking(booking._id, session?.user.token ?? "");
      if (res != null) {
        setRefresh((prev: boolean) => !prev);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full bg-secondary-100 rounded-xl p-2 grid grid-cols-[40%_40%_20%] items-center">
      <Link href={"/company/" + booking.company.id} className="text-xl">
        Company: {booking.company.name}
      </Link>
      <p className="text-xl">
        Booking Date:{" "}
        {new Date(booking.bookingDate).toLocaleDateString("en-GB")}
      </p>
      <span className="flex gap-4 justify-end">
        <button
          className="text-white rounded-lg px-2 py-1 text-xl bg-blue-500 inline-block"
          onClick={(e) => {
            e.preventDefault();
            setOpenEditModal(true);
          }}
        >
          <HiPencil className="inline mr-1" />
          Edit
        </button>
        <button
          className="text-white rounded-lg px-2 py-1 text-xl bg-red-500"
          onClick={(e) => {
            e.preventDefault();
            onDelete();
          }}
        >
          <HiX className="inline mr-1" />
          Cancel
        </button>
      </span>
      {openEditModal && (
        <BookingForm
          title="Edit Booking"
          bookingDataState={[editBookingData, setEditBookingData]}
          onSubmit={onEdit}
          setOpenModal={setOpenEditModal}
        />
      )}
    </div>
  );
}

function BookingForm({
  title,
  bookingDataState: [addBookingData, setBookingData],
  setOpenModal,
  onSubmit,
}: {
  title: string;
  bookingDataState: [
    AddBookingInterface,
    React.Dispatch<React.SetStateAction<AddBookingInterface>>
  ];
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: any;
}) {
  return (
    <div
      className={
        "flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full bg-gray-700 bg-opacity-25"
      }
      onClick={(e) => {
        e.stopPropagation();
        setOpenModal(false);
      }}
    >
      <div
        className="relative bg-white rounded-lg shadow p-5 w-[60%]"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h1 className="text-2xl">{title}</h1>
        <form action={onSubmit}>
          <div className="my-3 flex items-center gap-3">
            Booking Date:
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale="en-gb"
            >
              <DatePicker
                value={dayjs(addBookingData.bookingDate)}
                onChange={(value) => {
                  if (value != null) {
                    setBookingData({
                      ...addBookingData,
                      bookingDate: value.toDate(),
                    });
                  }
                }}
                className="bg-white"
                slotProps={{ textField: { size: "small" } }}
              />
            </LocalizationProvider>
          </div>
          <div className="text-right">
            <button className="blue-button">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
