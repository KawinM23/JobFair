import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import { HiBriefcase } from "react-icons/hi";

export default async function MenuBar() {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <div className="h-20 bg-primary-100 fixed top-0 left-0 right-0 z-30 flex flex-row justify-between items-center">
      <Link
        href={"/"}
        className="h-[80%] mx-4 justify-end w-auto text-3xl flex items-center text-primary-500 gap-3"
      >
        <HiBriefcase size={40} className="inline" />
        JobFair
      </Link>
      <span className="h-full flex justify-end items-center mx-2">
        <MenuBarItem title="Company" pageRef="/company" />
        <div className="h-[60%] border border-gray-400" />
        {session && (
          <>
            <MenuBarItem title="My Booking" pageRef="/mybooking" />
            <div className="h-[60%] border border-gray-400" />
          </>
        )}
        {session ? (
          <Link href="/api/auth/signout">
            <div className="px-5 text-center my-auto text-2xl text-cyan-500 hover:underline">
              Sign-Out
            </div>
          </Link>
        ) : (
          <Link href="/api/auth/signin">
            <div className="px-5 text-center my-auto text-2xl text-cyan-500 hover:underline">
              Sign-In
            </div>
          </Link>
        )}
      </span>
    </div>
  );
}

interface Props {
  title: string;
  pageRef: string;
}

function MenuBarItem(props: Props) {
  return (
    <Link
      href={props.pageRef}
      className="text-center my-auto text-2xl text-primary-500 mx-5 hover:underline"
    >
      {props.title}
    </Link>
  );
}
