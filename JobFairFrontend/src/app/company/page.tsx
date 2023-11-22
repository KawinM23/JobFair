"use client";
import { addCompnay, getAllCompanies } from "@/libs/api/company";
import { AddCompany, Company } from "@/libs/interface/company";
import { useState, useEffect } from "react";
import CompanyCard from "./components/CompanyCard";
import { useSession } from "next-auth/react";
import CompanyForm from "./components/CompanyForm";
import { HiOutlinePlus } from "react-icons/hi";

export default function page() {
  const { data: session } = useSession();

  const [allCompanies, setAllCompanies] = useState<Company[] | null>(null);
  const [displayCompanies, setDisplayCompanies] = useState<Company[] | null>(
    null
  );
  const [searchName, setSearchName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await getAllCompanies();
      if (res.data != null) {
        setAllCompanies(res.data);
      }
      setLoading(false);
    };

    fetchData();
    updateSearch();

    return () => {};
  }, [refresh]);

  const updateSearch = () => {
    if (allCompanies != null) {
      if (searchName != "") {
        let filteredCompanies: Company[] = [];
        filteredCompanies = filteredCompanies.concat(
          allCompanies.filter((company) =>
            company.name.toLowerCase().includes(searchName.toLowerCase())
          )
        );
        filteredCompanies = filteredCompanies.concat(
          allCompanies.filter(
            (company) =>
              !filteredCompanies.includes(company) &&
              company.business.toLowerCase().includes(searchName.toLowerCase())
          )
        );
        setDisplayCompanies(filteredCompanies);
      } else {
        setDisplayCompanies(allCompanies);
      }
    }
  };

  useEffect(() => {
    updateSearch();
  }, [searchName, allCompanies]);

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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="py-5 px-10">
      <span className="flex flex-row justify-between">
        <span>
          <h1 className="inline">Company</h1>
          <input
            type="text"
            id="companyName"
            name="companyName"
            placeholder="Search Company Name or Business"
            className="rounded-md border flex-1 py-1 px-2 mx-4 inline text-lg w-[400px]"
            value={searchName}
            onChange={(e) => {
              setSearchName(e.target.value);
            }}
          />
        </span>
        {session?.user.role == "admin" && (
          <button
            onClick={() => {
              setOpenAddCompany(true);
            }}
            className="text-white rounded-md py-1 px-3 bg-blue-500 hover:bg-blue-300 flex items-center gap-2"
          >
            <HiOutlinePlus size={20} />
            Add Company
          </button>
        )}
      </span>

      {loading ? (
        <></>
      ) : displayCompanies && displayCompanies.length != 0 ? (
        <div className="grid grid-cols-4 gap-5 my-5">
          {displayCompanies.map((company) => {
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
        <div className="text-xl text-gray-500 my-5">No Company!</div>
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
