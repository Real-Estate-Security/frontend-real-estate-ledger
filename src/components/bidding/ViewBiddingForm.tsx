// import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useState } from "react";
// import { PropertyDetailForm } from "./PropertyDetailForm";
// import { ListingDetailForm } from "./ListDetailForm";
// import { usePropertyStore } from "@/store/propertyStore";
// import { useListingStore } from "@/store/listingStore";

export function ViewBiddingForm() {
  // const [formBuyerID, setFormBuyerID] = useState("");
  // const { getPropertyByIDAPI, propertyFromAPI} = usePropertyStore();  
  // const {getListingByPropertyIDApi, listingFromAPI} = useListingStore();
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");
  
  // const [isAssetDetailVisible, setIsAssetDetailVisible] = useState(false); // State to control visibility

  // const handleGetAssetById = async () => {
  //   console.log("handleGetAssetById-> Asset ID:", formBuyerID);
  //   try {
  //     setIsLoading(true);
  //     await getPropertyByIDAPI(Number(formBuyerID), "test123");
  //     await getListingByPropertyIDApi(Number(formBuyerID), "test123");
  //     setIsAssetDetailVisible(true); // Show the asset detail form after successful submission      
  //   } catch (error) {
  //     console.error("Bidding submission error:", error);
  //     setError("Failed to submit bidding. Please try again.");
  //   } finally {
  //     setIsLoading(false);        
  //   }
  // };

  interface DataRow {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
  }
  
  const sampleData: DataRow[] = [
    { id: 1, name: "Alice", email: "alice@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Bob", email: "bob@example.com", role: "User", status: "Inactive" },
    { id: 3, name: "Charlie", email: "charlie@example.com", role: "Editor", status: "Active" },
  ];

  return (
    <>
      <CardContent className="pt-5 mx-auto">
        <div className="space-y-5">
          <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">User Table</h2>

          

          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">ListingID</th>
                <th className="px-4 py-2">BuyerID</th>
                <th className="px-4 py-2">AgentID</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">PreviousBidID</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
            {sampleData.map((row) => (
            <tr key={row.id} className="border-t">
              <td className="px-4 py-2">{row.id}</td>
              <td className="px-4 py-2">{row.name}</td>
              <td className="px-4 py-2">{row.email}</td>
              <td className="px-4 py-2">{row.role}</td>
              <td className="px-4 py-2">{row.status}</td>
              <td className="px-4 py-2">{row.status}</td>
              <td className="px-4 py-2">{row.status}</td>
            </tr>
          ))}
            </tbody>
          </table>
      </div>
          {/* Error message */}
          {/* {error && <div className="text-red-500 text-sm mt-2">{error}</div>} */}
        </div>
        {/* Conditionally render the asset detail form */}
        {/* {isAssetDetailVisible && (
          <div id="assetDetailFormId">
            {propertyFromAPI && <PropertyDetailForm propertyFromAPI={propertyFromAPI} />}
            {listingFromAPI && <ListingDetailForm listingFromAPI={listingFromAPI}/>}
          </div>
        )} */}
      </CardContent>
    </>
  );
}
