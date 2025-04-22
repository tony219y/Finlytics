import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCreateExpense, useExpenseForm } from "@/hooks/useExpense";

const CreateExpense = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useExpenseForm();

  const createExpense = useCreateExpense(() => reset());
  const onSubmit = (data: {
    amount: number;
    category: string;
    description: string;
    date: string;
  }) => {
    createExpense.mutate(data);
  };
  return (
    <Card className="min-w-[500px] w-fit min-h-[200px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          Add a new Expense
        </CardTitle>
        <form
          className="flex flex-col w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex w-full gap-4">
            <div className="flex flex-col w-full gap-2">
              <Label>Amount</Label>
              <Input
                {...register("amount", { valueAsNumber: true })}
                placeholder="$10,000.00"
                required
              />
              {errors.amount && (
                <p className="text-sm text-red-500">{errors.amount.message}</p>
              )}
            </div>
            <div className="flex flex-col w-full gap-2">
              <Label>Category</Label>
              <Input
                {...register("category")}
                placeholder="Salary, Gift, Invesment, Other."
                required
              />
            </div>
          </div>
          <div className="flex flex-col w-full gap-2 mt-2">
            <Label>Description</Label>
            <Input {...register("description")} required />
          </div>
          <div className="flex flex-col w-fill gap-2 mt-1">
            <Label>Date</Label>
            <div className="flex w-full gap-4 justify-between">
              <Input
                {...register("date")}
                type="date"
                className="w-fit"
                required
              />
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </form>
      </CardHeader>
    </Card>
  );
};
export default CreateExpense;
