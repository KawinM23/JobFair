import { getAllCompanies } from "@/libs/api/company";
import { Company } from "@/libs/interface/company";
import CompanyCard from "./components/CompanyCard";

export default async function page() {
  const res = await getAllCompanies();
  const allCompanies: Company[] = res.data;

  return (
    <main className="p-5">
      Company
      <div className="grid grid-cols-4 gap-3">
        {allCompanies.map((company) => {
          return <CompanyCard company={company} />;
        })}
      </div>
    </main>
  );
}
