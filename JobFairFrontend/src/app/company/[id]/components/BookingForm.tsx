"use client";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { useState } from "react";

export default function BookingForm() {
  const [bookDate, setBookDate] = useState<Dayjs | null>();

  const onSubmit = () => {};

  return (
    <div className="mt-5">
      <h2 className="text-xl">Book your reservation</h2>
      <div className="flex flex-row gap-2 items-center">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={bookDate}
            onChange={(value) => {
              setBookDate(value);
            }}
            className="bg-white"
            slotProps={{ textField: { size: "small" } }}
          />
        </LocalizationProvider>
        <button className="blue-button">Book</button>
      </div>
    </div>
  );
}
