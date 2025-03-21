import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Listing {
  id: number;
  property_id: number;
  agent_id: number;
  price: number;
  listing_status: string;
  listing_date: string;
  description?: string;
  accepted_bid_id?: number;
}

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

  useEffect(() => {
    const fetchListings = async () => {
    //   try {
        const response = await fetch("/api/listings");
        if (!response.ok) throw new Error("Failed to fetch listings");
        const data = await response.json();
        setListings(data);
    //   } catch (error) {
    //     setError("Error fetching listings");
    //   } finally {
    //     setLoading(false);
      
    };
    fetchListings();
  }, []);

//   if (loading) return <p>Loading listings...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Available Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {listings.map((listing) => (
          <Card key={listing.id} className="p-4 border rounded-lg shadow-md">
            <CardContent>
              <p className="text-lg font-semibold">Price: ${listing.price.toFixed(2)}</p>
              <p>Status: {listing.listing_status}</p>
              <p>Listed on: {new Date(listing.listing_date).toLocaleDateString()}</p>
              {listing.description && <p>Description: {listing.description}</p>}
            </CardContent>
            <CardFooter>
              <Button className="w-full">View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}