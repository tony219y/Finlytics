import CreateIncome from "@/components/dashboard/income/CreateIncome";
import IncomeCard from "@/components/dashboard/income/IncomeCard";
import TableIncome from "@/components/dashboard/income/TableIncome";
const Income = () => {
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex w-fit gap-10">
        <IncomeCard />
        <CreateIncome />
      </div>
      {/* Table */}
      <TableIncome />
    </div>
  );
};

export default Income;
