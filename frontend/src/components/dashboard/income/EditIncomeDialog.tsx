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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Income, UpdateIncome } from "@/hooks/useIncome";
import { incomeSchema, IncomeSchema } from "@/lib/income.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { PencilIcon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
interface EditIncomeDialogProps {
  selectedItems: number[];
  setSelectedItems: Dispatch<SetStateAction<number[]>>;
  refetch: () => void;
  data?: Income;
}

const EditIncomeDialog = ({
  selectedItems,
  setSelectedItems,
  refetch,
  data,
}: EditIncomeDialogProps) => {
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IncomeSchema>({
    resolver: zodResolver(incomeSchema),
    defaultValues: {
      amount: data?.amount,
      source: data?.source,
      date: data?.date,
    },
  });

  const handleEdit = async (dataInput: any) => {
    const response = await UpdateIncome(selectedItems[0], dataInput);
    if (response) {
      setEditOpen(false);
      setSelectedItems([]);
      refetch(); // Refresh income list
    }
  };

  return (
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
        <form
          className="flex flex-col w-full space-y-4"
          onSubmit={handleSubmit(handleEdit)}
        >
          <div className="flex flex-col gap-4">
            <Label>Amount</Label>
            <Input
              type="number"
              {...register("amount", { valueAsNumber: true })}
              placeholder={data?.amount?.toString()}
            />{" "}
            {errors.amount && (
              <p className="text-sm text-red-500">{errors.amount.message}</p>
            )}
            <Label>source</Label>
            <Input {...register("source")} placeholder={data?.source} />
            {errors.source && (
              <p className="text-sm text-red-500">{errors.source.message}</p>
            )}
          </div>
          <Label>Date</Label>
          <Input {...register("date")} type="date" className="w-fit" />
          <Button className="ml-auto">Save changes</Button>
        </form>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default EditIncomeDialog;
