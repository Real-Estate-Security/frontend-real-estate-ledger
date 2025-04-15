import { Button } from "@/components/ui/button";
import { CardFooter, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ListingFromAPI } from "@/store/listingStore";
import { useBiddingStore } from "@/store/biddingStore";

/*
interface ListingDetailFormProps {
  onSubmit?: (formAssetData: {
    formListingId: number;
    formListingPropertyId: number;
    formListingAgentId: number;
    formListingPrice: number;
    formListingStatus: string;
    formListingDate: string;
    formListingDescription: string;
    formListingAcceptedBidId: number;
  }) => void;
}
*/

interface ListingDetailFormProps {
  listingFromAPI: ListingFromAPI; 
}

export function ListingDetailForm({ listingFromAPI }: ListingDetailFormProps) {

  const [formMyBiddingPrice, setFormMyBiddingPrice] = useState("");
  const {createBiddingAPI, getLatestBidonListingAPI} = useBiddingStore();  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {

    try {
      setIsLoading(true);
      console.log("Agent ID from listingFromAPI: ", listingFromAPI.AgentId);
      const latestBid = await getLatestBidonListingAPI(listingFromAPI.Id);
      await createBiddingAPI(listingFromAPI.AgentId, formMyBiddingPrice, listingFromAPI.AgentId, listingFromAPI.Id, latestBid?.ID);
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
          {/* Error message */}
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 pt-2 pb-6">
        <Button
          className="w-full h-11 font-medium transition-all hover:shadow-md"
          onClick={handleSubmit}
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
