import Image from "next/image";
import { Company } from "@/libs/interface/company";

export default function CompanyCard({ company }: { company: Company }) {
  return (
    <div className="bg-slate-400 rounded-lg p-3">
      <div className="relative w-full h-[200px]">
        <Image
          src={company.picture}
          alt={company.name}
          fill
          className="object-contain"
        />
      </div>

      <h2>{company.name}</h2>
      <p>{company.business}</p>
    </div>
  );
}
