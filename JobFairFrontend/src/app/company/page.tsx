"use client";
import { addCompnay, getAllCompanies } from "@/libs/api/company";
import { AddCompany, Company } from "@/libs/interface/company";
import { CapitalizeFirstLetter } from "@/libs/text";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import CompanyCard from "./components/CompanyCard";
import { useSession } from "next-auth/react";

export default function page() {
  const { data: session } = useSession();

  const [allCompanies, setAllCompanies] = useState<Company[] | null>(null);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllCompanies();
      if (res.data != null) {
        setAllCompanies(res.data);
      }
    };

    fetchData();

    return () => {};
  }, [refresh]);

  const [openAddCompany, setOpenAddCompany] = useState(false);
  const [addCompanyData, setAddCompanyData] = useState({
    name: "",
    address: "",
    business: "",
    province: "",
    postalcode: "",
    tel: "",
    picture: "",
  });

  const clearAddCompanyData = () => {
    setAddCompanyData({
      name: "",
      address: "",
      business: "",
      province: "",
      postalcode: "",
      tel: "",
      picture: "",
    });
  };

  const onSubmit = async () => {
    try {
      const res = await addCompnay(
        addCompanyData as AddCompany,
        session?.user.token ?? ""
      );
      if (res != null) {
        setOpenAddCompany(false);
        clearAddCompanyData();
        setRefresh((prev) => !prev);
      }
    } catch (error) {}
  };

  return (
    <main className="p-5">
      <span className="flex flex-row justify-between">
        <h1 className="text-3xl font-bold">Company</h1>
        {session?.user.role == "admin" && (
          <button
            onClick={() => {
              setOpenAddCompany(true);
            }}
            className="text-white rounded-md py-1 px-3 bg-blue-500 hover:bg-blue-300"
          >
            Add Company
          </button>
        )}
      </span>

      {allCompanies ? (
        <div className="grid grid-cols-4 gap-3 my-3">
          {allCompanies.map((company) => {
            return (
              <CompanyCard
                company={company}
                session={session}
                setRefresh={setRefresh}
                key={company.id}
              />
            );
          })}
        </div>
      ) : (
        <div>No Company Available!</div>
      )}
      {session?.user.role == "admin" && openAddCompany && (
        <div
          className={
            "flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full bg-gray-700 bg-opacity-25"
          }
          onClick={(e) => {
            e.stopPropagation();
            setOpenAddCompany(false);
          }}
        >
          <div
            className="relative bg-white rounded-lg shadow p-5 w-[60%]"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h1 className="text-2xl">Add Company</h1>
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
                  value={addCompanyData.name}
                  onChange={(e) => {
                    setAddCompanyData({
                      ...addCompanyData,
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
                  value={addCompanyData.business}
                  onChange={(e) => {
                    setAddCompanyData({
                      ...addCompanyData,
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
                  value={addCompanyData.address}
                  onChange={(e) => {
                    setAddCompanyData({
                      ...addCompanyData,
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
                  value={addCompanyData.province}
                  onChange={(e) => {
                    setAddCompanyData({
                      ...addCompanyData,
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
                  value={addCompanyData.postalcode}
                  placeholder="10101"
                  onChange={(e) => {
                    setAddCompanyData({
                      ...addCompanyData,
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
                  value={addCompanyData.tel}
                  placeholder="0123456789"
                  onChange={(e) => {
                    setAddCompanyData({
                      ...addCompanyData,
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
                  value={addCompanyData.picture}
                  placeholder="https://drive.goole.com"
                  onChange={(e) => {
                    setAddCompanyData({
                      ...addCompanyData,
                      picture: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="float-right">
                <button
                  type="submit"
                  className="mt-3 text-white rounded-md py-1 px-3 bg-blue-500 hover:bg-blue-300"
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
