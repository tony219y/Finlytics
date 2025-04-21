import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetTotalExpense } from "@/hooks/useExpense";
import {TrendingDown} from "lucide-react"

const ExpenseCard = () => {
  const { data, isLoading } = useGetTotalExpense();
  if (isLoading) return <p>Loading...</p>;
  return (
    <Card className="w-[300px] min-h-[200px]">
      <CardHeader>
        <CardDescription className="flex items-center gap-2 text-xl"><TrendingDown/>Expense</CardDescription>
        <CardTitle className="text-4xl font-bold">{data}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};
export default ExpenseCard;
