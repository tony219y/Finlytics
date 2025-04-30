import BalanceCard from "@/components/dashboard/balance/BalanceCard";
// import BudgetCard from "@/components/dashboard/budget/BudgetCard";
import ExpenseCard from "@/components/dashboard/expense/ExpenseCard";
import IncomeCard from "@/components/dashboard/income/IncomeCard";

const Dashboard = () => {
  return (
    <>
        <div className="flex gap-4 p-10 w-fit h-fit rounded-2xl max-md:flex-col">
          <BalanceCard />
          <IncomeCard />
          <ExpenseCard />
          {/* <BudgetCard /> */}
        </div>
    </>
  );
};
export default Dashboard;
