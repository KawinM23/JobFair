export async function userLogin(userEmail: string, userPassword: string) {
  const res = await fetch("http://localhost:5000/api/v1/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: userEmail, password: userPassword }),
  });
  if (!res.ok) {
    throw new Error("Failed to log-in");
  }

  return await res.json();
}

export async function getAuthMe(token: string) {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_ROUTE + "/auth/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
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
