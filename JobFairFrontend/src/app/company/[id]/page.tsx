"use client";
import { editCompnay, getCompany } from "@/libs/api/company";
import { AddCompany, Company } from "@/libs/interface/company";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import CompanyForm from "../components/CompanyForm";
import BookingForm from "./components/BookingForm";
import { HiPencil } from "react-icons/hi";

export default function page({ params }: { params: { id: string } }) {
  const { data: session } = useSession();

  const [companyData, setCompanyData] = useState<Company | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCompany(params.id);
      if (res.data != null) {
        setCompanyData(res.data);
        setDefaultEditCompanyData(res.data);
      }
    };

    fetchData();

    return () => {};
  }, [refresh]);

  const [openEditCompany, setOpenEditCompany] = useState(false);
  const [editCompanyData, setEditCompanyData] = useState({
    name: "",
    address: "",
    business: "",
    province: "",
    postalcode: "",
    tel: "",
    picture: "",
  });

  const setDefaultEditCompanyData = (companyData: Company) => {
    setEditCompanyData(companyData as AddCompany);
  };

  const onEditCompany = async () => {
    try {
      const res = await editCompnay(
        companyData?.id ?? "",
        editCompanyData as AddCompany,
        session?.user.token ?? ""
      );
      if (res != null) {
        setOpenEditCompany(false);
        setRefresh((prev) => !prev);
      }
    } catch (error) {}
  };

  if (companyData === null) {
    return (
      <main className="h-[calc(100vh-5rem)] center-container">Loading...</main>
    );
  }

  return (
    <main>
      <div className="flex flex-row w-[80%] mx-auto pt-10 gap-5">
        <div className="relative w-[40%]">
          <Image
            src={companyData?.picture ?? ""}
            alt={""}
            width={1000}
            height={200}
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="flex-1">
          <span className="flex flex-row justify-between items-center">
            <h1 className="text-3xl">{companyData.name}</h1>
            {session?.user.role == "admin" && (
              <button
                onClick={() => {
                  setOpenEditCompany(true);
                }}
                className="text-white rounded-md py-1 px-3 bg-blue-500 hover:bg-blue-300"
              >
                <HiPencil className="inline mr-1" />
                Edit Company
              </button>
            )}
          </span>
          <p className="text-xl">{companyData.business}</p>
          <p className="text-xl">Address: {companyData.address}</p>
          <p className="text-xl">Province: {companyData.province}</p>
          <p className="text-xl">Postal Code: {companyData.postalcode}</p>
          <p className="text-xl">
            Telephone: {companyData.tel != "" ? companyData.tel : "-"}
          </p>
          {session?.user && (
            <BookingForm companyId={companyData.id} session={session} />
          )}
        </div>
      </div>
      {session?.user.role == "admin" && openEditCompany && (
        <CompanyForm
          title={"Edit Company"}
          companyDataState={[editCompanyData, setEditCompanyData]}
          setOpenModal={setOpenEditCompany}
          onSubmit={onEditCompany}
        />
      )}
    </main>
  );
}
