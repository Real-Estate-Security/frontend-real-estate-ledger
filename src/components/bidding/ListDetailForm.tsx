import { Button } from "@/components/ui/button";
import { CardFooter, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

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

export function ListingDetailForm({ onSubmit }: ListingDetailFormProps) {
  const [formListingId] = useState("101");
  const [formListingAgentId] = useState("201");
  const [formListingPrice] = useState("500,000");
  const [formListingStatus] = useState("Active");
  const [formListingDate] = useState("Mar 1 2025");
  const [formListingDescription] = useState("Great location and schools");
  const [formListingAcceptedBidId] = useState("99");
  const [formMyBiddingPrice, setFormMyBiddingPrice] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!onSubmit) return;

    try {
      setIsLoading(true);
/*      await onSubmit({
        formPropertyAddress: formAssetPropertyAddress,
        formPropertyCity: formPropertyCity,
        formPropertyOwner: formPropertyOwner,
        formPropertyState: formPropertyState
      });*/
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
                Listing Id: {formListingId}
              </Label>
            </div>          
            <div className="space-y-2">
                <Label htmlFor="formListingAgentIdLabel" className="font-medium">
                Agency Id: {formListingAgentId}
                </Label>
            </div>
            <div className="space-y-2">
                <Label htmlFor="formListingPriceLabel" className="font-medium">
                Price: {formListingPrice}
                </Label>
            </div>
            <div className="space-y-2">
                <Label htmlFor="formListingStatusLabel" className="font-medium">
                Status: {formListingStatus}
                </Label>
            </div>
            <div className="space-y-2">
                <Label htmlFor="formListingDateLabel" className="font-medium">
                Start Date: {formListingDate}
                </Label>
            </div> 
            <div className="space-y-2">
                <Label htmlFor="formListingDescriptionLabel" className="font-medium">
                Description: {formListingDescription}
                </Label>
            </div>    
            <div className="space-y-2">
                <Label htmlFor="formListingAcceptedBidIdLabel" className="font-medium">
                Accepted Bit Id: {formListingAcceptedBidId}
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
