import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetTotalBalance } from "@/hooks/useBalance";

import { DollarSign } from "lucide-react";

const BalanceCard = () => {
  const { data, isLoading } = useGetTotalBalance();
  if (isLoading) return <p>Loading...</p>;
  return (
    <Card className="w-[300px] min-h-[200px]">
      <CardHeader>
        <CardDescription className="flex items-center gap-2 text-xl">
          <DollarSign />
          Balance
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
export default BalanceCard;
