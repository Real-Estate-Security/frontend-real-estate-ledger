import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ViewListings = () => {
  const navigate = useNavigate();

  const handleNewListing = () => {
    navigate("/frontend-real-estate-ledger/properties");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* View Listings Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
             <span className="text-primary">Current Listings </span>
          </h1>
          <div className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            View current listings, research property details, and submit bids on available properties.
            <div className="mt-10 flex justify-center gap-4">
              <Link to="/frontend-real-estate-ledger/properties">
                <Button size="lg" className="cursor-pointer" onClick={handleNewListing}>
                  Create a Listing
                </Button>
              </Link>
              <Link to="/frontend-real-estate-ledger/bids">
                <Button variant="outline" size="lg" className="cursor-pointer">
                  Place a Bid
                </Button>
              </Link>
            </div>
         </div>
        </div>
      </section>
    </div>
  )
}

export default ViewListings;