import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BiddingForm } from "@/components/bidding/BiddingForm";

export default function Bidding() {

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">
          Bid on a property
        </CardTitle>
        <CardDescription>
          Enter your bidding information
        </CardDescription>
      </CardHeader>
      <BiddingForm/>
    </Card>
  </div>
  );
}
