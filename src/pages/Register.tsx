import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const { register } = useAuthStore();
  const navigate = useNavigate();

  const handleRegister = async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    username: string;
    role: string;
    dateOfBirth?: Date;
  }) => {
    // Note: You'll need to update your register function to accept all these fields
    // For now, I'm using the original signature as shown in your code
    await register(
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.password,
      userData.username,
      userData.role as "user" | "agent",
      userData.dateOfBirth || new Date()
    );

    // Log for development - you would normally send all fields to your backend
    console.log("User registration data:", {
      ...userData,
      password: "[REDACTED]", // Don't log actual password
      dateOfBirth: userData.dateOfBirth?.toISOString(),
    });

    navigate("/frontend-real-estate-ledger/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            Create an account
          </CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <RegisterForm onSubmit={handleRegister} />
      </Card>
    </div>
  );
}
