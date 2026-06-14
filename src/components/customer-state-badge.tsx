import type { CustomerState } from "#/features/customer/customer.schema";
import { Badge } from "#/components/ui/badge";

const stateColors: Record<CustomerState, string> = {
    lead: "bg-gray-200 text-gray-800",
    contacted: "bg-yellow-200 text-yellow-800",
    in_talk: "bg-blue-200 text-blue-800",
    lost: "bg-red-200 text-red-800",
    won: "bg-green-200 text-green-800"    
};

export default function CustomerStateBadge({ state }: { state: CustomerState }) {
  return (
    <Badge className={stateColors[state]}>
      {state}
    </Badge>
  );
}