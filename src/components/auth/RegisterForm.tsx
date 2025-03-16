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

interface RegisterFormProps {
  onSubmit?: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    username: string;
    role: string;
    dateOfBirth?: Date;
  }) => void;
}

export function RegisterForm({ onSubmit }: RegisterFormProps) {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const validateForm = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    if (!username || !firstName || !lastName || !email || !password || !role) {
      setError("All fields are required");
      return false;
    }

    if (!dateOfBirth) {
      setError("Date of birth is required");
      return false;
    }

    // Simple age validation - Must be at least 18 years old
    const today = new Date();
    const eighteenYearsAgo = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );

    if (dateOfBirth > eighteenYearsAgo) {
      setError("You must be at least 18 years old to register");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async () => {
    if (!onSubmit || !validateForm()) return;

    try {
      setIsLoading(true);
      await onSubmit({
        firstName,
        lastName,
        email,
        password,
        username,
        role,
        dateOfBirth,
      });
    } catch (error) {
      console.error("Registration error:", error);
      setError("Failed to register. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <CardContent className="pt-5">
        <div className="space-y-5">
          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username" className="font-medium">
              Username
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <User className="h-5 w-5" />
              </div>
              <Input
                id="username"
                placeholder="johndoe"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 bg-gray-50 focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* First and Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="font-medium">
                First name
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <UserPlus className="h-5 w-5" />
                </div>
                <Input
                  id="firstName"
                  placeholder="John"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="pl-10 bg-gray-50 focus:bg-white transition-colors"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="font-medium">
                Last name
              </Label>
              <Input
                id="lastName"
                placeholder="Doe"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-gray-50 focus:bg-white transition-colors"
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
            !username ||
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !confirmPassword ||
            !role ||
            !dateOfBirth
          }
        >
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/frontend-real-estate-ledger/login"
            className="text-primary font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-sm"
            tabIndex={0}
          >
            Log in
          </a>
        </div>
      </CardFooter>
    </>
  );
}
