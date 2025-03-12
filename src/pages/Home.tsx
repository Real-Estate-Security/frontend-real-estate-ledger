import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building, Home as HomeIcon, DollarSign, Shield } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

const Home = () => {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Welcome to <span className="text-primary">Real Estate Ledger</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Your comprehensive platform for documenting real estate property
            transactions and investments with ease and security.
          </p>
          {!user && (
            <div className="mt-10 flex justify-center gap-4">
              <Link to="/frontend-real-estate-ledger/register">
                <Button size="lg" className="cursor-pointer">
                  Get Started
                </Button>
              </Link>
              <Link to="/frontend-real-estate-ledger/login">
                <Button variant="outline" size="lg" className="cursor-pointer">
                  Sign In
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Real Estate Ledger?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background shadow-sm">
              <Building className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Property Documentation
              </h3>
              <p className="text-muted-foreground">
                Easily document your real estate property with detailed
                information and tracking.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background shadow-sm">
              <DollarSign className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Transaction Tracking
              </h3>
              <p className="text-muted-foreground">
                Keep track of all your financial transactions in a single place.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background shadow-sm">
              <HomeIcon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Transparency & Fraud Prevention
              </h3>
              <p className="text-muted-foreground">
                Make informed decisions with comprehensive information.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background shadow-sm">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Secure and Reliable
              </h3>
              <p className="text-muted-foreground">
                Your data is protected with enterprise-grade security and a
                cryptographicly secure database.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Manage Your Real Estate Portfolio?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of real estate professionals who trust Real Estate
            Ledger for their property management needs.
          </p>
          {!user && (
            <Link to="/frontend-real-estate-ledger/register">
              <Button size="lg" className="cursor-pointer">
                Create Your Account
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
