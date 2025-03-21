import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
//   import { BiddingForm } from "@/components/bidding/Bidding";
//   import { useNavigate } from "react-router-dom";
  
  export default function BiddingPage() {
    
    // const navigate = useNavigate();
  
    // const handleProperty = async (userData: {
    //     userfirstName: string;
    //     userlastName: string;
    //     userEmail: string;
    //     agentfirstName: string;
    //     agentlastName: string;
    //     agentEmail: string;
    //     address: string;
    //     description: string;
    //     bathrooms: number;
    //     bedrooms: number;
    // }) => {
    //   navigate("/frontend-real-estate-ledger/");
    //   console.log("Listing registration data:", userData);
    // };
  
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">
              Create a listing
            </CardTitle>
            <CardDescription>
                UWU
            </CardDescription>
          </CardHeader>
          {/* <ListingForm onSubmit={handleProperty} /> */}
        </Card>
      </div>
    );
  }
  