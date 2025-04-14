import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Home, Menu, User, Building, House, Users } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

export default function NavHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const closeSheet = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    navigate("/frontend-real-estate-ledger/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-slate-800 bg-black/95">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-15">
          <Link
            to="/frontend-real-estate-ledger"
            className="flex items-center gap-2"
          >
            <Building className="h-6 w-6 text-white" />
            <span className="font-bold text-xl hidden sm:inline-block text-white">
              Real Estate Ledger
            </span>
          </Link>

          <Link
            to="/frontend-real-estate-ledger/listings"
            className="flex items-center gap-2"
          >
            <House className="h-6 w-6 text-white" />
            <span className="font-bold text-xl hidden sm:inline-block text-white">
              Listings
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/frontend-real-estate-ledger/bidding"
            className="flex items-center gap-2"
          >
            <House className="h-6 w-6 text-white" />
            <span className="font-bold text-xl hidden sm:inline-block text-white">
              Make Bid
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/frontend-real-estate-ledger/view-bids"
            className="flex items-center gap-2"
          >
            <House className="h-6 w-6 text-white" />
            <span className="font-bold text-xl hidden sm:inline-block text-white">
              List Bid
            </span>
          </Link>
        </div>        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              <Link
                to="/frontend-real-estate-ledger"
                className="text-sm font-medium transition-colors hover:text-blue-400 text-white"
              >
                Dashboard
              </Link>
              <Link
                to="/frontend-real-estate-ledger/properties"
                className="text-sm font-medium transition-colors hover:text-blue-400 text-white"
              >
                Properties
              </Link>
              <Link
                to="/frontend-real-estate-ledger/listings"
                className="text-sm font-medium transition-colors hover:text-blue-400 text-white"
              >
                Listings
              </Link>
              <Link
                to="/frontend-real-estate-ledger/transactions"
                className="text-sm font-medium transition-colors hover:text-blue-400 text-white"
              >
                Transactions
              </Link>
              {(user.role === "agent" ||
                user.role === "admin" ||
                user.role == "user") && (
                <Link
                  to="/frontend-real-estate-ledger/agent-dashboard"
                  className="text-sm font-medium transition-colors hover:text-blue-400 text-white"
                >
                  Agent Dashboard
                </Link>
              )}
              <div className="flex items-center gap-4">
                <Link
                  to="/frontend-real-estate-ledger/profile"
                  className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-blue-400 text-white"
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleLogout}
                  className="cursor-pointer bg-red-600 hover:bg-red-700"
                >
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/frontend-real-estate-ledger/login">
                <Button
                  variant="outline"
                  className="cursor-pointer text-black bg-white border-white hover:bg-gray-100"
                >
                  Login
                </Button>
              </Link>
              <Link to="/frontend-real-estate-ledger/register">
                <Button className="cursor-pointer bg-blue-600 hover:bg-blue-700">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="outline"
              size="icon"
              className="cursor-pointer text-white border-white hover:bg-white hover:text-black"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-black border-slate-800">
            <div className="flex flex-col gap-6 py-6">
              {user ? (
                <>
                  <Link
                    to="/frontend-real-estate-ledger"
                    className="flex items-center gap-2 text-lg font-medium text-white hover:text-blue-400"
                    onClick={closeSheet}
                  >
                    <Home className="h-5 w-5" />
                    Dashboard
                  </Link>
                  <Link
                    to="/frontend-real-estate-ledger/properties"
                    className="flex items-center gap-2 text-lg font-medium text-white hover:text-blue-400"
                    onClick={closeSheet}
                  >
                    <Building className="h-5 w-5" />
                    Properties
                  </Link>
                  <Link
                    to="/frontend-real-estate-ledger/listings"
                    className="flex items-center gap-2 text-lg font-medium text-white hover:text-blue-400"
                    onClick={closeSheet}
                  >
                    <Building className="h-5 w-5" />
                    Listings
                  </Link>
                  <Link
                    to="/frontend-real-estate-ledger/transactions"
                    className="flex items-center gap-2 text-lg font-medium text-white hover:text-blue-400"
                    onClick={closeSheet}
                  >
                    <span className="h-5 w-5 flex items-center justify-center">
                      $
                    </span>
                    Transactions
                  </Link>
                  {user.role === "agent" && (
                    <Link
                      to="/frontend-real-estate-ledger/agent-dashboard"
                      className="flex items-center gap-2 text-lg font-medium text-white hover:text-blue-400"
                      onClick={closeSheet}
                    >
                      <Users className="h-5 w-5" />
                      Agent Dashboard
                    </Link>
                  )}
                  <div className="flex flex-col gap-2 mt-4">
                    <Link
                      to="/frontend-real-estate-ledger/profile"
                      className="flex items-center gap-2 text-lg font-medium text-white hover:text-blue-400"
                      onClick={closeSheet}
                    >
                      <User className="h-5 w-5" />
                      Profile
                    </Link>
                    <Button
                      variant="destructive"
                      className="mt-2 cursor-pointer bg-red-600 hover:bg-red-700"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/frontend-real-estate-ledger/login"
                    onClick={closeSheet}
                  >
                    <Button
                      variant="outline"
                      className="w-full cursor-pointer text-black bg-white border-white hover:bg-gray-100"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link
                    to="/frontend-real-estate-ledger/register"
                    onClick={closeSheet}
                  >
                    <Button className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
