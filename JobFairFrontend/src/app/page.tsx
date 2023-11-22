import { getServerSession } from "next-auth";
import Link from "next/link";
import { HiBriefcase } from "react-icons/hi";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main className="center-container h-[calc(100vh-5rem)] flex-col gap-5">
      <HiBriefcase size={100} className="text-primary-500" />
      <h1 className="text-5xl text-primary-500">Job Fair</h1>
      <h2 className="text-3xl text-primary-300">
        Find a Company and Book to get interview
      </h2>
      {!session?.user && (
        <div className="flex flex-row gap-10 justify-between items-center">
          <Link
            className="rounded bg-secondary-200 text-primary-600 px-5 py-1 text-xl hover:opacity-90"
            href={"/user/register"}
          >
            Register
          </Link>
          <Link
            className="rounded bg-secondary-200 text-primary-600 px-5 py-1 text-xl hover:opacity-90"
            href={"/user/login"}
          >
            Login
          </Link>
        </div>
      )}
    </main>
  );
}
