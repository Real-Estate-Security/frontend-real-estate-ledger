import { useEffect, useState } from "react";
import { getListings, type ListingDisplayResponse }from "@/services/listingDisplayService";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


// const LISTINGS = [ //example from shacn documentation - replace w listing info from table SQL
//   {
//     invoice: "INV001",
//     paymentStatus: "Paid",
//     totalAmount: "$250.00",
//     paymentMethod: "Credit Card",
//   },
//   {
//     invoice: "INV002",
//     paymentStatus: "Pending",
//     totalAmount: "$150.00",
//     paymentMethod: "PayPal",
//   },
//   {
//     invoice: "INV003",
//     paymentStatus: "Unpaid",
//     totalAmount: "$350.00",
//     paymentMethod: "Bank Transfer",
//   },
//   {
//     invoice: "INV004",
//     paymentStatus: "Paid",
//     totalAmount: "$450.00",
//     paymentMethod: "Credit Card",
//   },
//   {
//     invoice: "INV005",
//     paymentStatus: "Paid",
//     totalAmount: "$550.00",
//     paymentMethod: "PayPal",
//   },
//   {
//     invoice: "INV006",
//     paymentStatus: "Pending",
//     totalAmount: "$200.00",
//     paymentMethod: "Bank Transfer",
//   },
//   {
//     invoice: "INV007",
//     paymentStatus: "Unpaid",
//     totalAmount: "$300.00",
//     paymentMethod: "Credit Card",
//   },
// ]

export default function ViewListings() {
  const [listings, setListings] = useState<ListingDisplayResponse[]>([]);
  
  const loadListings = async () => {
    try {
      const data = await getListings();
      setListings(data);
    } 
    
    catch (error) {
      "Failed to display listings";
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
     
        
      
  <Table className="max-h-screen, overflow-scroll, text-2xl">
  <TableCaption>A list of all current listings.</TableCaption>
  
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
    <div>
    {listings.map((listing, idx) => (
    <div key={idx}>
        
  <TableFooter>
    <TableRow>
      <TableCell colSpan={1}>{listing.first_name} {listing.last_name}</TableCell>
      <TableCell colSpan={1}>{listing.email}</TableCell>
      <TableCell colSpan={1}>{listing.address}</TableCell>
      <TableCell colSpan={1}>{listing.city}</TableCell>
      <TableCell colSpan={1}>{listing.price}</TableCell>
      <TableCell colSpan={1}>{listing.zipcode}</TableCell>
      <TableCell colSpan={1}>{listing.state}</TableCell>
      <TableCell colSpan={1}>{listing.listing_date}</TableCell>
      <TableCell colSpan={1}>{listing.listing_status}</TableCell>
      <TableCell colSpan={1}>{listing.bedrooms}</TableCell>
      <TableCell colSpan={1}>{listing.bathrooms}</TableCell>
      <TableCell colSpan={1}>{listing.description}</TableCell>
    </TableRow>
  </TableFooter>
    </div>
        ))}
    </div>
  </Table>
      </section>
    </div>
)
  
}