"use client";
import { addCompnay, getAllCompanies } from "@/libs/api/company";
import { AddCompany, Company } from "@/libs/interface/company";
import { useState, useEffect } from "react";
import CompanyCard from "./components/CompanyCard";
import { useSession } from "next-auth/react";
import CompanyForm from "./components/CompanyForm";
import { revalidateTag } from "next/cache";

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
        revalidateTag("company");
        setRefresh((prev) => !prev);
      }
    } catch (error) {}
  };

  return (
    <main className="py-5 px-10">
      <span className="flex flex-row justify-between">
        <h1>Company</h1>
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
        <div className="grid grid-cols-4 gap-5 my-3">
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
        <CompanyForm
          title={"Add Company"}
          companyDataState={[addCompanyData, setAddCompanyData]}
          setOpenModal={setOpenAddCompany}
          onSubmit={onSubmit}
        />
      )}
    </main>
  );
}
