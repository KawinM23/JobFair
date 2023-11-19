"use client";

import { editCompnay, getCompany } from "@/libs/api/company";
import { AddCompany, Company } from "@/libs/interface/company";
import { CapitalizeFirstLetter } from "@/libs/text";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function page({ params }: { params: { id: string } }) {
  const { data: session } = useSession();

  const [companyData, setCompanyData] = useState<Company | null>(null);
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

  const onSubmit = async () => {
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
        </div>
      </div>
      {session?.user.role == "admin" && openEditCompany && (
        <div
          className={
            "flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full bg-gray-700 bg-opacity-25"
          }
          onClick={(e) => {
            e.stopPropagation();
            setOpenEditCompany(false);
          }}
        >
          <div
            className="relative bg-white rounded-lg shadow p-5 w-[60%]"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h1 className="text-2xl">Edit Company</h1>
            <form action={onSubmit}>
              <div className="my-1 flex items-center">
                <label htmlFor="name" className="mr-2 inline-block">
                  Company Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="rounded-md border w-[300px] p-1"
                  value={editCompanyData.name}
                  onChange={(e) => {
                    setEditCompanyData({
                      ...editCompanyData,
                      name: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="my-1 flex items-center">
                <label htmlFor="business" className="mr-2 inline-block">
                  {CapitalizeFirstLetter("business")}
                </label>
                <textarea
                  id="business"
                  name="business"
                  className="rounded-md border flex-1 p-1 min-h-[2rem] max-h-[10rem]"
                  value={editCompanyData.business}
                  onChange={(e) => {
                    setEditCompanyData({
                      ...editCompanyData,
                      business: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="my-1 flex items-center">
                <label htmlFor="address" className="mr-2 inline-block">
                  {CapitalizeFirstLetter("address")}
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="rounded-md border flex-1 p-1"
                  value={editCompanyData.address}
                  onChange={(e) => {
                    setEditCompanyData({
                      ...editCompanyData,
                      address: e.target.value,
                    });
                  }}
                />
              </div>

              <div className="my-1 flex items-center">
                <label htmlFor="province" className="mr-2 inline-block">
                  {CapitalizeFirstLetter("province")}
                </label>
                <input
                  type="text"
                  id="province"
                  name="province"
                  className="rounded-md border flex-1 p-1"
                  value={editCompanyData.province}
                  onChange={(e) => {
                    setEditCompanyData({
                      ...editCompanyData,
                      province: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="my-1 flex items-center">
                <label htmlFor="postalcode" className="mr-2 inline-block">
                  {CapitalizeFirstLetter("Postal Code")}
                </label>
                <input
                  type="text"
                  id="postalcode"
                  name="postalcode"
                  className="rounded-md border p-1 w-20"
                  value={editCompanyData.postalcode}
                  placeholder="10101"
                  onChange={(e) => {
                    setEditCompanyData({
                      ...editCompanyData,
                      postalcode: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="my-1 flex items-center">
                <label htmlFor="tel" className="mr-2 inline-block">
                  {CapitalizeFirstLetter("Telephone")}
                </label>
                <input
                  type="text"
                  id="tel"
                  name="tel"
                  className="rounded-md border p-1 w-40"
                  value={editCompanyData.tel}
                  placeholder="0123456789"
                  onChange={(e) => {
                    setEditCompanyData({
                      ...editCompanyData,
                      tel: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="my-1 flex items-center">
                <label htmlFor="picture" className="mr-2 inline-block">
                  {CapitalizeFirstLetter("picture URL")}
                </label>
                <input
                  type="text"
                  id="picture"
                  name="picture"
                  className="rounded-md border p-1 flex-1"
                  value={editCompanyData.picture}
                  placeholder="https://drive.goole.com"
                  onChange={(e) => {
                    setEditCompanyData({
                      ...editCompanyData,
                      picture: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="float-right">
                <button
                  type="submit"
                  className="mt-3 text-white  rounded-md py-1 px-3 bg-blue-500 hover:bg-blue-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
