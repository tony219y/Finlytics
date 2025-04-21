import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const BudgetCard = () => {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-sm text-muted-foreground">Budget</h3>
        <h2 className="text-2xl font-bold">$2,000</h2>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground mb-2">Used: $1,200</div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-green-500 h-2 rounded-full w-[60%]" />
        </div>
        <div className="text-xs text-muted-foreground mt-2">
          Remaining: $800
        </div>
      </CardContent>
    </Card>
  );
};
export default BudgetCard;
