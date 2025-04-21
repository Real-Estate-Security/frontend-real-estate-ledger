import { useEffect, useState } from "react";
import { CardContent } from "@/components/ui/card";
import { useBiddingStore } from "@/store/biddingStore";
import { useListingStore } from "@/store/listingStore";

export function ViewBiddingForm() {
  const { getBidingListByBuyerIdAPI, listBidsResponseFromAPI, updateBidStatusAPI } = useBiddingStore();  
  const { updateAcceptedBidIdByListingIdAPI } = useListingStore();
  const [isLoading, setIsLoading] = useState(true);
  const [statusMap, setStatusMap] = useState<{ [id: number]: string }>({});
  const [errorForUI, setErrorForUI] = useState("");
  const [statusMessageForUI, setStatusMessageForUI] = useState<React.ReactNode>("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await getBidingListByBuyerIdAPI(1);
        await new Promise(resolve => setTimeout(resolve, 1000)); 
      } catch (error) {
        console.error("Failed to load bidding table data:", error);
        setErrorForUI("Failed to load bidding table data.")
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, []); 

  useEffect(() => {
    if (listBidsResponseFromAPI) {
      // Initialize local state for dropdowns
      const initialStatus: { [id: number]: string } = {};
      listBidsResponseFromAPI.forEach((row) => {
        initialStatus[row.ID] = row.Status;
      });
      setStatusMap(initialStatus);
    }
    
  }, [listBidsResponseFromAPI]);

  const handleStatusChange = async (id: number, currentListingId: number, newStatus: string) => {
    try {
      let previousStatus = null;
      setStatusMap((prev) => {
        previousStatus = prev[id];
        console.log("Previous status for id=", id, "was", previousStatus);
      
        return { ...prev, [id]: newStatus };
      });

      await updateBidStatusAPI(id, newStatus);
      console.log("handleStatusChange Status changed for id=", id, ", new status =", newStatus, ", listingId=", currentListingId);
      if(currentListingId && newStatus == "accepted") {
        await updateAcceptedBidIdByListingIdAPI(id, currentListingId);
        console.log("handleStatusChange: updateAcceptedBidIdByListingIdAPI updated accepted_bit_id for listingId=", currentListingId, ", with bidId=", id);        
      }

      setStatusMessageForUI(
        <>
          <span className="font-bold">Message:</span> Bidding Status Update is successful for bidding id=
          <span className="font-bold">{id}</span>, status changed from previous status:{" "}
          <span className="font-bold">{previousStatus}</span> to new status:{" "}
          <span className="font-bold">{newStatus}</span>
        </>
      );
    } 
    catch (error) {
      console.error("Failed to handleStatusChange:", error);
    }
  };

  return (
    <CardContent className="pt-5 mx-auto w-[770px]">
      <div className="space-y-5">
          {/* Error message */}
          {errorForUI && <div className="text-red-500 text-sm mt-2">{errorForUI}</div>}
          {/* Update Status message */}
          {statusMessageForUI && <div className="text-blue-500 text-sm mt-2 mb-[20px]">{statusMessageForUI}</div>}
          {isLoading ? (
            <div className="text-center text-gray-500">Loading Bidding List Detail...</div>
          ) : (
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-4 py-2">Bid ID</th>
                  <th className="px-4 py-2">Bid Amount</th>
                  <th className="px-4 py-2">Buyer ID</th>
                  <th className="px-4 py-2">Listing ID</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Bid Status</th>
                </tr>
              </thead>
              <tbody>
                {listBidsResponseFromAPI?.map((row) => (
                  <tr key={row.ID} className="border-t">
                    <td className="px-4 py-2">{row.ID}</td>
                    <td className="px-4 py-2">{row.Amount}</td>
                    <td className="px-4 py-2">{row.BuyerId}</td>
                    <td className="px-4 py-2">{row.ListingId}</td>
                    <td className="px-4 py-2">{row.Amount}</td>
                    <td className="px-4 py-2">
                      <select
                        className="border rounded px-2 py-1"
                        value={statusMap[row.ID] || ""}
                        onChange={(e) => handleStatusChange(row.ID, row.ListingId, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                        <option value="countered">Countered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        
      </div>
    </CardContent>
  );
}
