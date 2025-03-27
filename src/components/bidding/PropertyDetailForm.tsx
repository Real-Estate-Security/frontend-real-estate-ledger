import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PropertyFromAPI } from "@/store/propertyStore";

interface PropertyDetailFormProps {
  propertyFromAPI: PropertyFromAPI; 
}

export function PropertyDetailForm({ propertyFromAPI }: PropertyDetailFormProps) {
  
  return (
    <>
      <CardContent className="pt-5">
        <p></p>
        <p>Property Detail</p>
        <p></p>
        <div className="space-y-5">
          <div className="space-y-2">
              <Label htmlFor="formPropertyOwnerLabel" className="font-medium">
                Property Owner: {propertyFromAPI.OwnerId}
              </Label>
            </div>          
            <div className="space-y-2">
                <Label htmlFor="formPropertyAddressLabel" className="font-medium">
                Address: {propertyFromAPI.Address}
                </Label>
            </div>
            <div className="space-y-2">
                <Label htmlFor="formPropertyCityLabel" className="font-medium">
                City: {propertyFromAPI.City}
                </Label>
            </div>
            <div className="space-y-2">
                <Label htmlFor="formPropertyStateLabel" className="font-medium">
                State: {propertyFromAPI.State}
                </Label>
            </div>
            <div className="space-y-2">
                <Label htmlFor="formPropertyZipCodeLabel" className="font-medium">
                Zip Code: {propertyFromAPI.ZipCode}
                </Label>
            </div> 
            <div className="space-y-2">
                <Label htmlFor="formPropertyNumOfBedroomsLabel" className="font-medium">
                Number of Bedroom: {propertyFromAPI.NumOfBedrooms}
                </Label>
            </div>      
            <div className="space-y-2">
                <Label htmlFor="formPropertyNumOfBathroomsLabel" className="font-medium">
                Number of Bathroom: {propertyFromAPI.NumOfBathrooms}
                </Label>
            </div>                               
        </div>
      </CardContent>
    </>
  );
}
