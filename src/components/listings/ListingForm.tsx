import { Button } from "@/components/ui/button";
import { CardFooter, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Mail, UserPlus, Bed, Bath, MapPinHouse, Pencil, DollarSign } from "lucide-react";
// import { StringToBoolean } from "class-variance-authority/types";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

interface ListingFormProps {
  onSubmit?: (userData: {
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

  }) => void;
}

export function ListingForm({ onSubmit }: ListingFormProps) {
  const [userfirstName, setUserFirstName] = useState("");
  const [userlastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [agentfirstName, setAgentFirstName] = useState("");
  const [agentlastName, setAgentLastName] = useState("");
  const [agentEmail, setAgentEmail] = useState("");
  const [description, setDescription] = useState("");
  const [listingPrice, setListingPrice] = useState<number>(0);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState<number>(0);
  const [bathrooms, setBathrooms] = useState<number>(0);
  const [bedrooms, setBedrooms] = useState<number>(0);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const validateForm = () => {

    // Simple age validation - Must be at least 18 years old
    const fname = agentfirstName;
    const lname = agentlastName;

    if ((fname == "") || (lname == "")) {
        setError("");
        return true;
    }

  };

  const handleSubmit = async () => {
    if (!onSubmit || !validateForm()) return;

    try {
      setIsLoading(true);
      await onSubmit({
        userfirstName,
        userlastName,
        userEmail,
        agentfirstName,
        agentlastName,
        agentEmail,
        listingPrice,
        address,
        city,
        state,
        zip,
        description,
        bathrooms,
        bedrooms
      });
    } catch (error) {
      console.error("Listing registration error:", error);
      setError("Failed to register listing. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  //special handler for Description with Textarea

  const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value); 
  };

  return (
    <>
      <CardContent className="pt-5">
        <div className="space-y-5">
          {/* User First and Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="userfirstName" className="font-medium">
                User first name
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <UserPlus className="h-5 w-5" />
                </div>
                <Input
                  id="userfirstName"
                  placeholder="First Name"
                  required
                  value={userfirstName}
                  onChange={(e) => setUserFirstName(e.target.value)}
                  className="pl-10 bg-gray-50 focus:bg-white transition-colors"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="userlastName" className="font-medium">
                User last name
              </Label>
              <Input
                id="userlastName"
                placeholder="Last Name"
                required
                value={userlastName}
                onChange={(e) => setUserLastName(e.target.value)}
                className="bg-gray-50 focus:bg-white transition-colors"
              />
            </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="userEmail" className="font-medium">
                User Email
                </Label>
                <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <Mail className="h-5 w-5" />
                </div>
                <Input
                    id="userEmail"
                    type="email"
                    placeholder="email@example.com"
                    required
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="pl-10 bg-gray-50 focus:bg-white transition-colors"
                />
            </div>
          
        </div>
          {/* Agent First and Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="agentfirstName" className="font-medium">
                Agent first name
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <UserPlus className="h-5 w-5" />
                </div>
                <Input
                  id="agentfirstName"
                  placeholder="First Name"
                  required
                  value={agentfirstName}
                  onChange={(e) => setAgentFirstName(e.target.value)}
                  className="pl-10 bg-gray-50 focus:bg-white transition-colors"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="agentlastName" className="font-medium">
                Agent last name
              </Label>
              <Input
                id="agentlastName"
                placeholder="Last Name"
                required
                value={agentlastName}
                onChange={(e) => setAgentLastName(e.target.value)}
                className="bg-gray-50 focus:bg-white transition-colors"
              />
            </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="agentEmail" className="font-medium">
                Agent Email
                </Label>
                <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <Mail className="h-5 w-5" />
                </div>
                <Input
                    id="agentEmail"
                    type="email"
                    placeholder="email@example.com"
                    required
                    value={agentEmail}
                    onChange={(e) => setAgentEmail(e.target.value)}
                    className="pl-10 bg-gray-50 focus:bg-white transition-colors"
                />
            </div>
            </div>

          {/* Listing Price */}
          <div className="space-y-2">
            <Label htmlFor="listingPrice" className="font-medium">
              Price of Listing
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <DollarSign className="h-5 w-5" />
              </div>
              <Input
                id="listingPrice"
                type="number"
                required
                value={listingPrice}
                onChange={(e) => setListingPrice(Number(e.target.value))}
                className="pl-10 bg-gray-50 focus:bg-white transition-colors"
              />
            </div>
            </div>

         <div className="space-y-5">
          {/* Property Address */}
            <div className="space-y-2">
              <Label htmlFor="address" className="font-medium">
                Address of Property
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <MapPinHouse className="h-5 w-5" />
                </div>
                <Input
                  id="address"
                  placeholder="Enter address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="pl-10 bg-gray-50 focus:bg-white transition-colors"
                />
              </div>
          </div>

          <div className="space-y-5">
          {/* Property City */}
            <div className="space-y-2">
              <Label htmlFor="city" className="font-medium">
                City
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <MapPinHouse className="h-5 w-5" />
                </div>
                <Input
                  id="city"
                  placeholder="Enter city"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="pl-10 bg-gray-50 focus:bg-white transition-colors"
                />
              </div>
          </div>

          {/* Property Zip Code */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="state" className="font-medium">
                State
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <MapPinHouse className="h-5 w-5" />
                </div>
                <Input
                  id="state"
                  placeholder="Enter State"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="pl-10 bg-gray-50 focus:bg-white transition-colors"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="zip" className="font-medium">
                Zip Code
              </Label>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <MapPinHouse className="h-5 w-5" />
              </div>
              <Input
                id="zip"
                placeholder="Zipcode"
                required
                value={zip}
                onChange={(e) => setZip(Number(e.target.value))}
                className="bg-gray-50 focus:bg-white transition-colors"
              />
            </div>
          </div>
          </div>
          
          {/* Bedrooms */}
          <div className="space-y-2">
            <Label htmlFor="bedrooms" className="font-medium">
              Number of bedrooms in property
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <Bed className="h-5 w-5" />
              </div>
              <Input
                id="bedrooms"
                type="number"
                required
                value={bedrooms}
                onChange={(e) => setBedrooms(Number(e.target.value))}
                className="pl-10 bg-gray-50 focus:bg-white transition-colors"
              />
            </div>
            </div>

          {/* Bathrooms */}
          <div className="space-y-2">
            <Label htmlFor="bathrooms" className="font-medium">
              Number of bathrooms in property
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <Bath className="h-5 w-5" />
              </div>
              <Input
                id="bathrooms"
                type="number"
                required
                value={bathrooms}
                onChange={(e) => setBathrooms(Number(e.target.value))}
                className="pl-10 bg-gray-50 focus:bg-white transition-colors"
              />
            </div>
          </div>
          </div>


          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="font-medium">
              Property Description
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 z-10">
                <Pencil className="h-5 w-5" />
              </div>
            <Textarea
                id="description" 
                placeholder="Please enter a short description of the property you are listing."
                  value={description}
                onChange={handleDescription}
                className="pl-10 bg-gray-50 focus:bg-white transition-colors"
              />
            </div>
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
            !userfirstName ||
            !userlastName ||
            !userEmail ||
            !agentEmail ||
            !agentfirstName ||
            !agentlastName ||
            !address ||
            !description ||
            !bathrooms ||
            !bedrooms
          }
        >
          {isLoading ? "Creating listing..." : "Create listing"}
        </Button>
        <div className="text-center text-sm text-gray-600">
          Want to place a bid on an existing listing?{" "}
          <a
            href="/frontend-real-estate-ledger/listings"
            className="text-primary font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-sm"
            tabIndex={0}
          >
            View Listings
          </a>
        </div>
      </CardFooter>
    </>
  );
}
