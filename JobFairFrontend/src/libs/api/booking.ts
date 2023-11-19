export async function getMyBooking(token: string) {
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
}
