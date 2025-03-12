import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Home, Menu, User, Building } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

export default function NavHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  // Check if user is on login or register page
  const isAuthPage =
    location.pathname === "/frontend-real-estate-ledger" ||
    location.pathname === "/frontend-real-estate-ledger/register";

  const closeSheet = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    navigate("/frontend-real-estate-ledger/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            to="/frontend-real-estate-ledger"
            className="flex items-center gap-2"
          >
            <Building className="h-6 w-6" />
            <span className="font-bold text-xl hidden sm:inline-block">
              Real Estate Ledger
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/frontend-real-estate-ledger"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
          <Link
            to="/frontend-real-estate-ledger/properties"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Properties
          </Link>
          <Link
            to="/frontend-real-estate-ledger/transactions"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Transactions
          </Link>

          {isAuthPage ? (
            <div className="flex items-center gap-2">
              <Link to="/frontend-real-estate-ledger/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/frontend-real-estate-ledger/register">
                <Button>Sign Up</Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/frontend-real-estate-ledger/profile"
                className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary"
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>
              <Button variant="outline" size="sm">
                Logout
              </Button>
            </div>
          )}
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-6 py-6">
              <Link
                to="/frontend-real-estate-ledger/dashboard"
                className="flex items-center gap-2 text-lg font-medium"
                onClick={closeSheet}
              >
                <Home className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                to="/frontend-real-estate-ledger/properties"
                className="flex items-center gap-2 text-lg font-medium"
                onClick={closeSheet}
              >
                <Building className="h-5 w-5" />
                Properties
              </Link>
              <Link
                to="/frontend-real-estate-ledger/transactions"
                className="flex items-center gap-2 text-lg font-medium"
                onClick={closeSheet}
              >
                <span className="h-5 w-5 flex items-center justify-center">
                  $
                </span>
                Transactions
              </Link>

              {isAuthPage ? (
                <div className="flex flex-col gap-2 mt-4">
                  <Link to="/frontend-real-estate-ledger" onClick={closeSheet}>
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link
                    to="/frontend-real-estate-ledger/register"
                    onClick={closeSheet}
                  >
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-2 mt-4">
                  <Link
                    to="/frontend-real-estate-ledger/profile"
                    className="flex items-center gap-2 text-lg font-medium"
                    onClick={closeSheet}
                  >
                    <User className="h-5 w-5" />
                    Profile
                  </Link>
                  <Button
                    variant="outline"
                    className="mt-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
