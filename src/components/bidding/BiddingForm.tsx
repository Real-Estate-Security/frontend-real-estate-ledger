import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { PropertyDetailForm } from "./PropertyDetailForm";
import { ListingDetailForm } from "./ListDetailForm";
import { usePropertyStore } from "@/store/propertyStore";
import { useListingStore } from "@/store/listingStore";

export function BiddingForm() {
  const [formPropertyId, setFormPropertyId] = useState("");
  const { getPropertyByIDAPI, propertyFromAPI} = usePropertyStore();  
  const {getListingByPropertyIDApi, listingFromAPI} = useListingStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [isAssetDetailVisible, setIsAssetDetailVisible] = useState(false); 

  const handleGetAssetById = async () => {
    console.log("handleGetAssetById-> Asset ID:", formPropertyId);
    try {
      setIsLoading(true);
      await getPropertyByIDAPI(Number(formPropertyId), "test123");
      await getListingByPropertyIDApi(Number(formPropertyId), "test123");
      setIsAssetDetailVisible(true);    
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
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="formPropertyIdLabel" className="font-medium">
                Property ID
              </Label>
                <Input
                  id="formPropertyIdInput"
                  placeholder="property1"
                  required
                  value={formPropertyId}
                  onChange={(e) => setFormPropertyId(e.target.value)}
                  className="pl-10 bg-gray-50 focus:bg-white transition-colors"
                />
            </div>
            <div className="space-y-2">
              <Label htmlFor="formRetrievAssetByIDLabel" className="font-medium">  
                Retrieve the property detail
              </Label>
              <Button
                id="formRetrievAssetByIDButton"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                onClick={handleGetAssetById}
                disabled={ isLoading || !formPropertyId }
              >                
                {isLoading ? "Retrieving Asset Detail..." : "Retrieve Asset Detail"}
            </Button>
            </div>            
          </div>
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </div>
        {isAssetDetailVisible && (
          <div id="assetDetailFormId">
            {propertyFromAPI && <PropertyDetailForm propertyFromAPI={propertyFromAPI} />}
            {listingFromAPI && <ListingDetailForm listingFromAPI={listingFromAPI}/>}
          </div>
        )}
      </CardContent>
    </>
  );
}
