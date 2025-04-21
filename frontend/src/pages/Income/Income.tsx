import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CreateIncome from "@/components/dashboard/income/CreateIncome";
import IncomeCard from "@/components/dashboard/income/IncomeCard";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { DeleteIncome, useGetIncome } from "@/hooks/useIncome";
import { Trash2, PencilIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
// TODO: Split a component
const Income = () => {
  const { data: incomes = [], isLoading, refetch } = useGetIncome();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [removeOpen, setRemoveOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);

  const handleCheckboxChange = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleRemove = async () => {
    const response = await DeleteIncome(selectedItems);
    if (response) {
      setRemoveOpen(false);
      setSelectedItems([]);
      refetch(); // Refresh income list
    }
  };
  const handleEdit = async () => {
    const response = await DeleteIncome(selectedItems);
    if (response) {
      setRemoveOpen(false);
      setSelectedItems([]);
      refetch(); // Refresh income list
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex w-fit gap-10">
        <IncomeCard />
        <CreateIncome />
      </div>

      <AnimatePresence>
        {selectedItems.length > 0 && (
          <motion.div
            className="flex gap-2 mb-2"
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* ✏️ Edit Dialog */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    className="flex items-center gap-1"
                    disabled={selectedItems.length !== 1}
                  >
                    <PencilIcon size={16} />
                    Edit Selected
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Income</DialogTitle>
                    <DialogDescription>
                      Make changes to your income and save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  {/* TODO: Replace with actual form */}
                  <form className="space-y-4">
                    <Input placeholder="Amount" />
                    <Input placeholder="Source" />
                    <Input type="date" />
                  </form>
                  <DialogFooter>
                    <Button type="submit" onClick={handleEdit}>
                      Save changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </motion.div>

            {/* 🗑 Remove Dialog */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Dialog open={removeOpen} onOpenChange={setRemoveOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Trash2 size={16} />
                    Remove Selected
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to remove {selectedItems.length}{" "}
                      selected
                      {selectedItems.length > 1 ? " items" : " item"}? This
                      action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="ghost" onClick={() => setRemoveOpen(false)}>
                      Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleRemove}>
                      Yes, Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </motion.div>
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
    </div>
  );
};

export default Income;
