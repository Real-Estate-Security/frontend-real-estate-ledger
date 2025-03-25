import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState } from "react";


export function PropertyDetailForm() {
  const [formPropertyOwner] = useState("John Robert");
  const [formPropertyAddress] = useState("326 Main Street");
  const [formPropertyCity] = useState("Austin");
  const [formPropertyState] = useState("Texas");
  const [formPropertyZipCode] = useState("78681");
  const [formPropertyNumOfBedrooms] = useState("5");
  const [formPropertyNumOfBathrooms] = useState("3");
  
  return (
    <>
      <CardContent className="pt-5">
        <p></p>
        <p>Property Detail</p>
        <p></p>
        <div className="space-y-5">
          <div className="space-y-2">
              <Label htmlFor="formPropertyOwnerLabel" className="font-medium">
                Property Owner: {formPropertyOwner}
              </Label>
            </div>          
            <div className="space-y-2">
                <Label htmlFor="formPropertyAddressLabel" className="font-medium">
                Address: {formPropertyAddress}
                </Label>
            </div>
            <div className="space-y-2">
                <Label htmlFor="formPropertyCityLabel" className="font-medium">
                City: {formPropertyCity}
                </Label>
            </div>
            <div className="space-y-2">
                <Label htmlFor="formPropertyStateLabel" className="font-medium">
                State: {formPropertyState}
                </Label>
            </div>
            <div className="space-y-2">
                <Label htmlFor="formPropertyZipCodeLabel" className="font-medium">
                Zip Code: {formPropertyZipCode}
                </Label>
            </div> 
            <div className="space-y-2">
                <Label htmlFor="formPropertyNumOfBedroomsLabel" className="font-medium">
                Number of Bedroom: {formPropertyNumOfBedrooms}
                </Label>
            </div>      
            <div className="space-y-2">
                <Label htmlFor="formPropertyNumOfBathroomsLabel" className="font-medium">
                Number of Bathroom: {formPropertyNumOfBathrooms}
                </Label>
            </div>                               
        </div>
      </CardContent>
    </>
  );
}
