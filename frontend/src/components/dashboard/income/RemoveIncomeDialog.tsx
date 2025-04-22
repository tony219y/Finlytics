import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { DeleteIncome } from "@/hooks/useIncome";
import { Trash2 } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

interface RemoveIncomeDialogProps {
  selectedItems: number[];
  setSelectedItems: Dispatch<SetStateAction<number[]>>;
  refetch: () => void;
}
const RemoveIncomeDialog = ({ selectedItems, setSelectedItems, refetch }: RemoveIncomeDialogProps) => {
  const [removeOpen, setRemoveOpen] = useState<boolean>(false);
  const handleRemove = async () => {
    const response = await DeleteIncome(selectedItems);
    if (response) {
      setRemoveOpen(false);
      setSelectedItems([]);
      refetch(); // Refresh income list
    }
  };
  return (
    <Dialog open={removeOpen} onOpenChange={setRemoveOpen}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          size="sm"
          className="flex w-fit items-center gap-1 hover:opacity-50 duration-300"
        >
          <Trash2 size={16} />
          Remove Selected
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove {selectedItems.length} selected
            {selectedItems.length > 1 ? " items" : " item"}? This action cannot
            be undone.
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
  );
};
export default RemoveIncomeDialog;
