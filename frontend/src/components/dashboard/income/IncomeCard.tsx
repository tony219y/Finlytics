import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetTotalIncome } from "@/hooks/useIncome";
import { TrendingUp } from "lucide-react";

const IncomeCard = () => {
  const { data, isLoading } = useGetTotalIncome();
  if (isLoading) return <p>Loading...</p>;

  return (
    <Card className="w-[300px] min-h-[200px]">
      <CardHeader>
        <CardDescription className="flex text-xl items-center gap-2">
          <TrendingUp />
          Income
        </CardDescription>
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
export default IncomeCard;
