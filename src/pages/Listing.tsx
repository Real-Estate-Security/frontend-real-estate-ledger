import { useEffect, useState } from "react";
import { getListings, type ListingDisplayResponse } from "@/services/listingDisplayService";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

export default function ViewListings() {
  const [listings, setListings] = useState<ListingDisplayResponse[]>([]);

  const loadListings = async () => {
    try {
      const data = await getListings();
      setListings(data);
    } catch (error) {
      console.log("Error: Failed to display listings", error);
    }
  };

  useEffect(() => {
    loadListings();
  }, []);

  const navigate = useNavigate();

  const handleNewListing = () => {
    navigate("/frontend-real-estate-ledger/properties");
  };

  const handleBid = (propertyId: number) => {
    navigate(`/frontend-real-estate-ledger/bidding?propertyId=${propertyId}`);
  };

  return (
    <div className="bg-background space-y-8">
      {/* View Listings Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            <span className="text-primary">Current Listings</span>
          </h1>
        </div>
        <div className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
          View current listings, research property details, and submit bids on available properties.
        </div>
        <div className="mt-10 mb-10 flex justify-center gap-4">
          <Link to="/frontend-real-estate-ledger/properties">
            <Button size="lg" className="cursor-pointer text-2xl" onClick={handleNewListing}>
              Create a Listing
            </Button>
          </Link>
          <Link to="/frontend-real-estate-ledger/bids">
            <Button variant="outline" size="lg" className="cursor-pointer text-2xl">
              Place a Bid
            </Button>
          </Link>
        </div>

        {/* Grid View for Listings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing, idx) => (
            <Card key={idx} className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  {listing.first_name} {listing.last_name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  <strong>Email:</strong> {listing.email}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Address:</strong> {listing.address}, {listing.city}, {listing.state} {listing.zipcode}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Price:</strong> ${listing.price}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Bedrooms:</strong> {listing.bedrooms} | <strong>Bathrooms:</strong> {listing.bathrooms}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Status:</strong> {listing.listing_status}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Description:</strong> {listing.description}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => handleBid(listing.property_id)}
                >
                  Bid
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}