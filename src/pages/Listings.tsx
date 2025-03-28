import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
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

const ViewListings = () => {
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

  <Table className="text-2xl">
  <TableCaption>A list of all current listings.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Agent First Name</TableHead>
      <TableHead className="w-[100px]">Agent Last Name</TableHead>
      <TableHead className="w-[200px]">Agent Email</TableHead>
      <TableHead>Address</TableHead>
      <TableHead className="w-[100px]">Status</TableHead>
      <TableHead>Price</TableHead>
      <TableHead className="w-[100px]">Bedrooms</TableHead>
      <TableHead className="w-[100px]">Bathrooms</TableHead>
      <TableHead>Details</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {/* {invoices.map((invoice) => (
      <TableRow key={invoice.invoice}>
        <TableCell className="font-medium">{invoice.invoice}</TableCell>
        <TableCell>{invoice.paymentStatus}</TableCell>
        <TableCell>{invoice.paymentMethod}</TableCell>
        <TableCell className="text-right">{invoice.totalAmount}</TableCell>
      </TableRow>
    ))} */}
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={1}>John</TableCell>
      <TableCell colSpan={1}>Doe</TableCell>
      <TableCell colSpan={1}>johndoe@mail.com</TableCell>
      <TableCell colSpan={1}>400 Bizzell Street College Station, TX 77843</TableCell>
      <TableCell colSpan={1}>Available</TableCell>
      <TableCell colSpan={1}>$145,000,000</TableCell>
      <TableCell colSpan={1}>5</TableCell>
      <TableCell colSpan={1}>3</TableCell>
      <TableCell colSpan={1}>University in an unbeatable location. Texas A&M is located in the heart of College Station, home to the Texas Aggies.</TableCell>
    </TableRow>
  </TableFooter>
  </Table>
      </section>
    </div>
)
  
}

export default ViewListings;