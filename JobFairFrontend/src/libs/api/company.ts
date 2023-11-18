import { AddCompany } from "./../interface/company";

export async function addCompnay(company: AddCompany, token: string) {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_ROUTE + "/companies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(company),
    });
    if (res.ok) {
      return res.json();
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function getAllCompanies() {
  const res = await fetch("http://localhost:5000/api/v1/companies", {
    next: { tags: ["companies"] },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch hospitals");
  }

  return await res.json();
}

export async function deleteCompnay(id: string, token: string) {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_ROUTE + "/companies/" + id,
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
