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

import { useState } from "react";
import { useGetIncome } from "@/hooks/useIncome";
import RemoveIncomeDialog from "./RemoveIncomeDialog";
import EditIncomeDialog from "./EditIncomeDialog";
import { AnimatePresence, motion } from "framer-motion";

const TableIncome = () => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const { data: incomes = [], isLoading, refetch } = useGetIncome();

  const handleCheckboxChange = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      <AnimatePresence>
        {selectedItems.length > 0 && (
          <motion.div
            className="flex gap-2 mx-2"
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <EditIncomeDialog
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              refetch={refetch}
              data={incomes.find((e) => e.id === selectedItems[0])}
            />
            <RemoveIncomeDialog
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
            <TableHead>Status</TableHead>
            <TableHead>Source</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incomes.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Checkbox
                  checked={selectedItems.includes(item.id)}
                  onCheckedChange={() => handleCheckboxChange(item.id)}
                  aria-label={`Select income from ${item.source}`}
                />
              </TableCell>
              <TableCell className="font-medium">
                {new Date(item.date).toLocaleDateString("en-GB")}
              </TableCell>
              <TableCell>Receives</TableCell>
              <TableCell>{item.source}</TableCell>
              <TableCell className="text-right">${item.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
export default TableIncome;
