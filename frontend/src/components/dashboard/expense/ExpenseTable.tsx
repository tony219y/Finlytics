import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { useGetExpense } from "@/hooks/useExpense";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import EditExpenseDialog from "./EditExpenseDialog";
import RemoveExpenseDialog from "./RemoveExpenseDialog";

const ExpenseTable = () => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const { data: expense = [], isLoading, refetch } = useGetExpense();

  const handleCheckboxChange = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      {/* Todo Edit And Remove */}
      <AnimatePresence>
        {selectedItems.length > 0 && (
          <motion.div
            className="flex gap-2 mx-2"
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <EditExpenseDialog
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              refetch={refetch}
              data={expense.find((e) => e.id === selectedItems[0])}
            />
            <RemoveExpenseDialog
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              refetch={refetch}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <Table>
        <TableCaption>A list of your recent incomes.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Select</TableHead>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expense.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Checkbox
                  checked={selectedItems.includes(item.id)}
                  onCheckedChange={() => handleCheckboxChange(item.id)}
                  aria-label={`Select expense from ${item.category}`}
                />
              </TableCell>
              <TableCell className="font-medium">
                <p>
                  {new Date(item.date).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </p>
              </TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell className="text-right font-bold">
                ฿{item.amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
export default ExpenseTable;
