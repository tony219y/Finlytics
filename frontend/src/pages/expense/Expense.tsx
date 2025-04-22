import CreateExpense from "@/components/dashboard/expense/CreateExpense"
import ExpenseCard from "@/components/dashboard/expense/ExpenseCard"
import ExpenseTable from "@/components/dashboard/expense/ExpenseTable"

const Expense = () => {
  return (
    <div className="flex flex-col w-full gap-4">
    <div className="flex w-fit gap-10">
        {/* Card and Create */}
        <ExpenseCard/>
        <CreateExpense/>
    </div>
    {/* Table */}
    <ExpenseTable/>
  </div>
  )
}
export default Expense