import { Button } from "@/components/ui/button";
import { CardFooter, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ListingFromAPI } from "@/store/listingStore";
import { useBiddingStore } from "@/store/biddingStore";
import { type Representation } from "@/services/agentService";

interface ListingDetailFormProps {
  listingFromAPI: ListingFromAPI; 
  representations: Representation[];
}

export function ListingDetailForm({ listingFromAPI,representations}: ListingDetailFormProps) {

  const [formMyBiddingPrice, setFormMyBiddingPrice] = useState("");
  const [currentSelectedBuyerId, setCurrentSelectedBuyerId] = useState<number | null>(null);
  const {createBiddingAPI, getLatestBidonListingAPI} = useBiddingStore();  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmitBid = async () => {

    try {
      setIsLoading(true);
      const latestBid = await getLatestBidonListingAPI(listingFromAPI.Id);

      if (latestBid) {
        console.log("handleSubmitBid: listingFromAPI: listingFromAPI.AgentId=", listingFromAPI.AgentId,
        ", formMyBiddingPrice=", formMyBiddingPrice,
        ", currentSelectedBuyerId=", currentSelectedBuyerId,
        ", listingFromAPI.Id=", listingFromAPI.Id,
        ", Current Agent ID", representations?.at(0)?.agent_id,
        ", latestBid.ID=", latestBid.ID);     
        await createBiddingAPI(representations?.at(0)?.agent_id ?? 0, formMyBiddingPrice, currentSelectedBuyerId ?? 0, listingFromAPI.Id, latestBid.ID);
      } else {
        console.log("handleSubmitBid without latestBid: listingFromAPI: listingFromAPI.AgentId=", listingFromAPI.AgentId,
        ", formMyBiddingPrice=", formMyBiddingPrice,
        ", currentSelectedBuyerId=", currentSelectedBuyerId,
        ", Current Agent ID", representations?.at(0)?.agent_id,
        ", listingFromAPI.Id=", listingFromAPI.Id);  
        await createBiddingAPI(representations?.at(0)?.agent_id ?? 0, formMyBiddingPrice, currentSelectedBuyerId ?? 0, listingFromAPI.Id, undefined);
      }
    } catch (error) {
      console.error("Bidding submission error:", error);
      setError("Failed to submit bidding. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <CardContent className="pt-5">
        <p></p>
        <p>Listing Detail</p>
        <p></p>
        <div className="space-y-5">
          <div className="space-y-2">
              <Label htmlFor="formListingIdLabel" className="font-medium">
                Listing ID: {listingFromAPI.Id}
              </Label>
            </div>          
            <div className="space-y-2">
                <Label htmlFor="formListingAgentIdLabel" className="font-medium">
                Agent Id: {listingFromAPI.AgentId}
                </Label>
            </div>
            <div className="space-y-2">
                <Label htmlFor="formListingPriceLabel" className="font-medium">
                Price: {listingFromAPI.Price}
                </Label>
            </div>
            <div className="space-y-2">
                <Label htmlFor="formListingStatusLabel" className="font-medium">
                Status: {listingFromAPI.ListingStatus}
                </Label>
            </div>
            <div className="space-y-2">
                <Label htmlFor="formListingDateLabel" className="font-medium">
                Listed Date: {listingFromAPI.ListingDate}
                </Label>
            </div> 
            <div className="space-y-2">
                <Label htmlFor="formListingDescriptionLabel" className="font-medium">
                Description: {listingFromAPI.Description}
                </Label>
            </div>    
            <div className="space-y-2">
                <Label htmlFor="formListingAcceptedBidIdLabel" className="font-medium">
                Accepted Bid Id: {listingFromAPI.AcceptedBidId}
                </Label>
            </div>
            <div className="space-y-2">
                <Label htmlFor="formMyBiddingPriceLabel" className="font-medium">
                Please enter your bidding price
                </Label>
                <Input
                    id="formMyBiddingPriceInput"
                    placeholder="520,000"
                    required
                    value={formMyBiddingPrice}
                    onChange={(e) => setFormMyBiddingPrice(e.target.value)}
                    className="pl-10 bg-gray-50 focus:bg-white transition-colors"
                />      
            </div>
            {/* Dropdown for representations */}
            <div className="space-y-2">
              <Label htmlFor="formRepresentationDropdown" className="font-medium">
                Select a Representation
              </Label>
              <select
                  id="formRepresentationDropdown"
                  className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setCurrentSelectedBuyerId(Number(e.target.value))}
                >
                  <option value="">-- Select Representation --</option>
                  {[...new Map(representations.map(r => [r.client_id, r])).values()].map((representation) => (
                    <option key={representation.client_id} value={representation.client_id}>
                      {representation.client_first_name} {representation.client_last_name} - {representation.client_id}
                    </option>
                  ))}
                </select>
            </div>                                                   
          {/* Error message */}
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 pt-2 pb-6">
        <Button
          className="w-full h-11 font-medium transition-all hover:shadow-md"
          onClick={handleSubmitBid}
          disabled={
            isLoading ||
            !formMyBiddingPrice
          }
        >
          {isLoading ? "Submitting Bid..." : "Submit Bid"}
        </Button>
      </CardFooter>
    </>
  );
}
