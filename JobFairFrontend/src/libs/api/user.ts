export async function register(registerData: any) {
  console.log({
    ...registerData,
    role: "user",
    createdAt: new Date().toISOString(),
  });
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_ROUTE + "/auth/register",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...registerData,
        role: "user",
        createdAt: new Date().toISOString(),
      }),
    }
  );
  if (!res.ok) {
    throw new Error("Failed to register");
  }

  return await res.json();
}

export async function userLogin(userEmail: string, userPassword: string) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_ROUTE + "/auth/login", {
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
