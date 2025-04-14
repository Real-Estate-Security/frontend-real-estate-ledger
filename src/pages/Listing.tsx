import { useEffect, useState } from "react";
import { getListings, type ListingDisplayResponse }from "@/services/listingDisplayService";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableCaption,
  TableCell,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ViewListings() {
  const [listings, setListings] = useState<ListingDisplayResponse[]>([]);
  
  const loadListings = async () => {
    try {
      const data = await getListings();
      setListings(data);
    } 
    
    catch (error) {
      console.log("Error: Failed to display listings", error);
    }
  };  

  useEffect(() => {loadListings();}); //try to load listings



  //////////////////////////// DO NOT EDIT BELOW UNTIL TIME TO FIX FORMATTING///////////////////////////
  const navigate = useNavigate();

  const handleNewListing = () => {
    navigate("/frontend-real-estate-ledger/properties");
  };

  return (
    <div className="bg-background, space-y-8">
      {/* View Listings Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
             <span className="text-primary">Current Listings </span>
          </h1>
          </div>
          <div className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            View current listings, research property details, and submit bids on available properties.
          </div>
            <div className="mt-10 mb-10 flex justify-center gap-4">
              <Link to="/frontend-real-estate-ledger/properties">
                <Button size="lg" className="cursor-pointer, text-2xl" onClick={handleNewListing}>
                  Create a Listing
                </Button>
              </Link>
              <Link to="/frontend-real-estate-ledger/bids">
                <Button variant="outline" size="lg" className="cursor-pointer, text-2xl">
                  Place a Bid
                </Button>
              </Link>
            </div>
     
        
      
  <Table  className="max-h-screen, overflow-scroll, text-2xl">
  <TableCaption>A view of all current listings.</TableCaption>
  
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">Agent Name</TableHead>
        <TableHead className="w-[200px]">Email</TableHead>
        <TableHead>Address</TableHead>
        <TableHead>City</TableHead>
        <TableHead>State</TableHead>
        <TableHead>ZipCode</TableHead>
        <TableHead>Price</TableHead>
        <TableHead className="w-[100px]">Listing Date</TableHead>
        <TableHead className="w-[100px]">Status</TableHead>
        <TableHead className="w-[100px]">Bedrooms</TableHead>
        <TableHead className="w-[100px]">Bathrooms</TableHead>
        <TableHead>Description</TableHead>
      </TableRow>
    </TableHeader>
    
  {/* Begin INTEGRATING BACKEND */}
  <TableBody>
  
  {listings.map((listing, idx) => (
        <TableRow key={idx}>
          <TableCell><p>{listing.first_name} {listing.last_name}</p></TableCell>
          <TableCell>{listing.email}</TableCell>
          <TableCell>{listing.address}</TableCell>
          <TableCell>{listing.city}</TableCell>
          <TableCell>{listing.state}</TableCell>
          <TableCell>{listing.zipcode}</TableCell>
          <TableCell>${listing.price}</TableCell>
          <TableCell>{listing.listing_date}</TableCell>
          <TableCell>{listing.listing_status}</TableCell>
          <TableCell>{listing.bedrooms}</TableCell>
          <TableCell>{listing.bathrooms}</TableCell>
          <TableCell>{listing.description}</TableCell>
        </TableRow>
        ))}
    </TableBody>

  </Table>
  </section>
  </div>
)
  
}