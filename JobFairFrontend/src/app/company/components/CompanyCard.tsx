import Image from "next/image";
import { Company } from "@/libs/interface/company";
import Link from "next/link";
import { deleteCompnay } from "@/libs/api/company";
import { Session } from "next-auth";
import { HiOutlineTrash } from "react-icons/hi";

export default function CompanyCard({
  company,
  session,
  setRefresh,
}: {
  company: Company;
  session: Session | null;
  setRefresh: Function;
}) {
  const onDelete = async () => {
    try {
      const res = await deleteCompnay(company.id, session?.user.token ?? "");
      if (res != null) {
        setRefresh((prev: boolean) => !prev);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Link href={"/company/" + company.id}>
      <div className="bg-secondary-100 rounded-2xl p-3 shadow-md hover:scale-[101%] hover:shadow-xl">
        <div className="relative w-full h-[200px] ">
          <Image
            src={company.picture}
            alt={company.name}
            fill
            sizes="25vw"
            className="object-cover rounded-lg"
          />
        </div>
        <div className="mt-2 px-1">
          <h2 className="text-xl">{company.name}</h2>
          <p className="truncate">{company.business}</p>
        </div>
        {session?.user.role == "admin" && (
          <div className="flex justify-end">
            <button
              className="text-white bg-red-500 px-2 py-1 rounded-md flex items-center gap-2"
              onClick={(e) => {
                e.preventDefault();
                onDelete();
              }}
            >
              <HiOutlineTrash size={20} />
              Delete
            </button>
          </div>
        )}
      </div>
    </Link>
  );
}
