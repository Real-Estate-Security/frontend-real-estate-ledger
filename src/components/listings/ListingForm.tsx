import { Button } from "@/components/ui/button";
import { CardFooter, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { User, Mail, Lock, UserPlus, Users, Calendar } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";

interface ListingFormProps {
  onSubmit?: (userData: {
    userfirstName: string;
    userlastName: string;
    userEmail: string;
    agentfirstName: string;
    agentlastName: string;
    agentEmail: string;
    address: string;
    description: string;
    bathrooms: number;
    bedrooms: number;

  }) => void;
}

export function RegisterForm({ onSubmit }: ListingFormProps) {
  const [userfirstName, setUserFirstName] = useState("");
  const [userlastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [agentfirstName, setAgentFirstName] = useState("");
  const [agentlastName, setAgentLastName] = useState("");
  const [agentEmail, setAgentEmail] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [bathrooms, setBathrooms] = useState<number>(0);
  const [bedrooms, setBedrooms] = useState<number>(0);


  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const validateForm = () => {

    // Simple age validation - Must be at least 18 years old
    const today = new Date();

    setError("");
    return true;
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
        address,
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
                  placeholder="John"
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

          {/* Date of Birth */}
          <div className="space-y-2">
            <Label htmlFor="dob" className="font-medium">
              Date of Birth
            </Label>
            <div className="relative">
              <Input
                id="dob"
                type="date"
                required
                value={dateOfBirth ? format(dateOfBirth, "yyyy-MM-dd") : ""}
                onChange={(e) => {
                  const newDate = e.target.value
                    ? new Date(e.target.value)
                    : undefined;
                  setDateOfBirth(newDate);
                }}
                className="pl-10 bg-gray-50 focus:bg-white transition-colors"
                max={format(
                  new Date(
                    new Date().getFullYear() - 18,
                    new Date().getMonth(),
                    new Date().getDate()
                  ),
                  "yyyy-MM-dd"
                )}
                min="1920-01-01"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 p-0 hover:bg-transparent"
                    >
                      <Calendar className="h-4 w-4 text-gray-400" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <CalendarComponent
                      mode="single"
                      selected={dateOfBirth}
                      onSelect={setDateOfBirth}
                      initialFocus
                      disabled={(date: Date) => {
                        // Disable future dates and dates less than 18 years ago
                        const today = new Date();
                        const minDate = new Date(1920, 0, 1); // Min date (1920-01-01)
                        const maxDate = new Date(
                          today.getFullYear() - 18,
                          today.getMonth(),
                          today.getDate()
                        );
                        return date > maxDate || date < minDate;
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="font-medium">
              Email
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <Mail className="h-5 w-5" />
              </div>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-gray-50 focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="font-medium">
              Password
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <Lock className="h-5 w-5" />
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-gray-50 focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="font-medium">
              Confirm Password
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <Lock className="h-5 w-5" />
              </div>
              <Input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10 bg-gray-50 focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label htmlFor="role" className="font-medium">
              Role
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 z-10">
                <Users className="h-5 w-5" />
              </div>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="pl-10 bg-gray-50 focus:bg-white transition-colors">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Agent</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
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
            href="/frontend-real-estate-ledger/login"
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
