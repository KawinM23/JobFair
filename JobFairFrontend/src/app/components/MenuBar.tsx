import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function MenuBar() {
  const session = await getServerSession(authOptions);

  return (
    <div className="h-20 bg-white fixed top-0 left-0 right-0 z-30 border-y-gray-400 border-y-2 flex flex-row justify-between items-center">
      <span className="h-full flex justify-end items-center">
        {session ? (
          <Link href="/api/auth/signout">
            <div className="px-5 text-center my-auto text-2xl text-cyan-500">
              Sign-Out
            </div>
          </Link>
        ) : (
          <Link href="/api/auth/signin">
            <div className="px-5 text-center my-auto text-2xl text-cyan-500">
              Sign-In
            </div>
          </Link>
        )}
        <MenuBarItem title="My Booking" pageRef="/mybooking" />
      </span>
      <span className="h-full flex justify-end items-center">
        <MenuBarItem title="Booking" pageRef="/booking" />
        <Link href={"/"} className="h-[90%] w-auto">
          <Image
            src="/img/vaccine-6592893_1280.png"
            alt={"logo"}
            className="h-full w-auto object-contain"
            width={300}
            height={300}
          />
        </Link>
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
      className="w-[140px] text-center my-auto text-2xl text-gray-600"
    >
      {props.title}
    </Link>
  );
}
