import { Button } from "@/components/ui/button";
import { CardFooter, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface AssetDetailFormProps {
  onSubmit?: (formAssetData: {
    formPropertyOwner: string;
    formPropertyAddress: string;
    formPropertyCity: string;
    formPropertyState: string;
    formPropertyZipCode: number;
    formPropertyNumOfBedrooms: number;
    formPropertyNumOfBathrooms: number;
  }) => void;
}

export function AssetDetailForm({ onSubmit }: AssetDetailFormProps) {
  const [formPropertyOwner, setFormPriorityOwner] = useState("");
  const [formPropertyAddress, setFormPropertyAddress] = useState("");
  const [formPropertyCity, setFormPropertyCity] = useState("");
  const [formPropertyState, setFormPropertyState] = useState("");
  const [formPropertyZipCode, setFormPropertyZipCode] = useState("");
  const [formPropertyNumOfBedrooms, setFormPropertyNumOfBedrooms] = useState("");
  const [formPropertyNumOfBathrooms, setFormPropertyNumOfBathrooms] = useState("");
  
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
        <div className="space-y-5">
          <div className="space-y-2">
              <Label htmlFor="formPropertyOwnerLabel" className="font-medium">
                Property Owner
              </Label>
              <Input
                id="formPropertyOwnerInput"
                placeholder="John Robert"
                required
                value={formPropertyOwner}
                onChange={(e) => setFormPriorityOwner(e.target.value)}
                className="bg-gray-50 focus:bg-white transition-colors"
              />
            </div>          
            <div className="space-y-2">
                <Label htmlFor="formPropertyAddressLabel" className="font-medium">
                Address
                </Label>
                <Input
                    id="formPropertyAddressInput"
                    placeholder="201 Main Street"
                    required
                    value={formPropertyAddress}
                    onChange={(e) => setFormPropertyAddress(e.target.value)}
                    className="pl-10 bg-gray-50 focus:bg-white transition-colors"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="formPropertyCityLabel" className="font-medium">
                City
                </Label>
                <Input
                    id="formPropertyCityInput"
                    placeholder="Austin"
                    required
                    value={formPropertyCity}
                    onChange={(e) => setFormPropertyCity(e.target.value)}
                    className="pl-10 bg-gray-50 focus:bg-white transition-colors"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="formPropertyStateLabel" className="font-medium">
                State
                </Label>
                <Input
                    id="formPropertyStateInput"
                    placeholder="Texas"
                    required
                    value={formPropertyState}
                    onChange={(e) => setFormPropertyState(e.target.value)}
                    className="pl-10 bg-gray-50 focus:bg-white transition-colors"
                />      
            </div>
            <div className="space-y-2">
                <Label htmlFor="formPropertyZipCodeLabel" className="font-medium">
                Zip Code
                </Label>
                <Input
                    id="formPropertyZipCodeInput"
                    placeholder="78681"
                    required
                    value={formPropertyZipCode}
                    onChange={(e) => setFormPropertyZipCode(e.target.value)}
                    className="pl-10 bg-gray-50 focus:bg-white transition-colors"
                />      
            </div> 
            <div className="space-y-2">
                <Label htmlFor="formPropertyNumOfBedroomsLabel" className="font-medium">
                Number of Bedroom
                </Label>
                <Input
                    id="formPropertyNumOfBedroomsInput"
                    placeholder="5"
                    required
                    value={formPropertyNumOfBedrooms}
                    onChange={(e) => setFormPropertyNumOfBedrooms(e.target.value)}
                    className="pl-10 bg-gray-50 focus:bg-white transition-colors"
                />      
            </div>      
            <div className="space-y-2">
                <Label htmlFor="formPropertyNumOfBathroomsLabel" className="font-medium">
                Number of Bathroom
                </Label>
                <Input
                    id="formPropertyNumOfBathroomsInput"
                    placeholder="2"
                    required
                    value={formPropertyNumOfBathrooms}
                    onChange={(e) => setFormPropertyNumOfBathrooms(e.target.value)}
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
            !formPropertyOwner ||
            !formPropertyAddress ||
            !formPropertyCity ||
            !formPropertyState ||                        
            !formPropertyZipCode ||
            !formPropertyNumOfBedrooms ||            
            !formPropertyNumOfBathrooms
          }
        >
          {isLoading ? "Submitting Bid..." : "Submit Bid"}
        </Button>
      </CardFooter>
    </>
  );
}
