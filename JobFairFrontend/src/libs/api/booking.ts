import { AddBookingInterface } from "../interface/booking";

export async function addBooking(
  companyId: string,
  addBooking: AddBookingInterface,
  token: string
) {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_ROUTE +
        "/companies/" +
        companyId +
        "/bookings",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(addBooking),
      }
    );
    if (res) {
      return res.json();
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function getMyBooking(token: string) {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_ROUTE + "/bookings", {
      next: { tags: ["booking"] },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch bookings");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
  }
}

export async function editBooking(
  id: string,
  booking: AddBookingInterface,
  token: string
) {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_ROUTE + "/bookings/" + id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(booking),
      }
    );
    if (res.ok) {
      return res.json();
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function deleteBooking(id: string, token: string) {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_ROUTE + "/bookings/" + id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (res.ok) {
      return res.json();
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
}
