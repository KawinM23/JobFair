export async function getAllCompanies() {
  const res = await fetch("http://localhost:5000/api/v1/companies", {
    next: { tags: ["companies"] },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch hospitals");
  }

  return await res.json();
}
