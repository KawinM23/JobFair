import { HiBriefcase } from "react-icons/hi";

export default function Home() {
  return (
    <main className="center-container h-[calc(100vh-5rem)] flex-col gap-5">
      <HiBriefcase size={100} className="text-primary-500" />
      <h1 className="text-5xl text-primary-500">Job Fair</h1>

      <h2 className="text-3xl text-primary-300">
        Find a Company and Book to get interview
      </h2>
    </main>
  );
}
