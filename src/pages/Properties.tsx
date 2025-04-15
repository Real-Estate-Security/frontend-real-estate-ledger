import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { ListingForm } from "@/components/listings/ListingForm";
  import { useNavigate } from "react-router-dom";
  
  export default function PropertyPage() {
    
    const navigate = useNavigate();
  
    const handleProperty = async (userData: {
        userfirstName: string;
        userlastName: string;
        userEmail: string;
        agentfirstName: string;
        agentlastName: string;
        agentEmail: string;
        listingPrice: number;
        address: string;
        city: string;
        state: string;
        zip: number;
        description: string;
        bathrooms: number;
        bedrooms: number;
    }) => {
      // navigate("/frontend-real-estate-ledger/");
      // console.log("Listing registration data:", userData);
      try {
        const res = await fetch("http://localhost:8000/properties", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            OwnerFirstName: userData.userfirstName,
            OwnerLastName: userData.userlastName,
            OwnerEmail: userData.userEmail,
            AgentFirstName: userData.agentfirstName,
            AgentLastName: userData.agentlastName,
            AgentEmail: userData.agentEmail,
            Price: userData.listingPrice.toString(),
            Address: userData.address,
            City: userData.city,
            State: userData.state,
            Zipcode: userData.zip,
            Description: userData.description,
            Bedrooms: userData.bedrooms,
            Bathrooms: userData.bathrooms,
          }),
        });
    
        if (!res.ok) {
          const errorRes = await res.json();
          throw new Error(errorRes.error || "Failed to create listing");
        }
    
        const data = await res.json();
        console.log("Successfully created listing:", data);
    
        // Navigate after success
        navigate("/frontend-real-estate-ledger/listings");
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error creating listing:", error.message);
          alert("Failed to create listing: " + error.message);
        } else {
          console.error("Unknown error creating listing:", error);
          alert("An unknown error occurred.");
        }
      }
    };
  
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">
              Create a listing
            </CardTitle>
            <CardDescription>
              Enter your property information
            </CardDescription>
          </CardHeader>
          <ListingForm onSubmit={handleProperty} />
        </Card>
      </div>
    );
  }
  