import { AddCompany } from "@/libs/interface/company";
import { CapitalizeFirstLetter } from "@/libs/text";

export default function CompanyForm({
  title,
  companyDataState: [addCompanyData, setAddCompanyData],
  setOpenModal,
  onSubmit,
}: {
  title: string;
  companyDataState: [
    AddCompany,
    React.Dispatch<React.SetStateAction<AddCompany>>
  ];
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: any;
}) {
  return (
    <div
      className={
        "flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full bg-gray-700 bg-opacity-25"
      }
      onClick={(e) => {
        e.stopPropagation();
        setOpenModal(false);
      }}
    >
      <div
        className="relative bg-white rounded-lg shadow p-5 w-[60%]"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h1 className="text-2xl">{title}</h1>
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
  );
}
