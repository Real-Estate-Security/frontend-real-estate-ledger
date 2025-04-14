import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ViewBiddingForm } from "@/components/bidding/ViewBiddingForm";

export default function ViewBids() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-[770px] mx-auto"> {/* 700px + 10px extra */}
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            View My Bids
          </CardTitle>
        </CardHeader>
        <ViewBiddingForm />
      </Card>
    </div>
  );
}

