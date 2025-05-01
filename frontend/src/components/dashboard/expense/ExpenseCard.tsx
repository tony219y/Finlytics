import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGetTotalExpense } from "@/hooks/useExpense";
import { TrendingDown, Info, ArrowDown, ArrowUp, Clock } from "lucide-react";

const ExpenseCard = () => {
  const { data, isLoading } = useGetTotalExpense();
  if (isLoading) return <p>Loading...</p>;
  return (
    <Card className="w-[300px] min-h-[200px] max-md:w-full">
      <CardHeader>
        <CardDescription className="flex items-center gap-2 text-xl">
          <TrendingDown color="red" />
          Expense
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info width={15} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Your total expenses in the current month</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardDescription>
        <CardTitle className="text-4xl font-bold">{data.value}</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-4 items-center">
        {data.isIncrease ? (
          <div className="flex items-center gap-2 bg-green-100 text-green-700 rounded-full px-2 py-1 text-xs">
            <ArrowUp color="green" size={12} />
            <p>{data.change}</p>
          </div>
        ) : (
          <div className="flex items-center gap-2 bg-red-100 text-red-700 rounded-full px-2 py-1 text-xs">
            <ArrowDown color="red" size={12} />
            <p>{data.change}</p>
          </div>
        )}
        <p className="text-xs text-gray-500">from last month</p>
      </CardContent>
      <CardFooter>
        <Clock size={14} className="mr-1" />
        <p>
          {new Date(data.updatedAt).toLocaleString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </p>
      </CardFooter>
    </Card>
  );
};
export default ExpenseCard;
