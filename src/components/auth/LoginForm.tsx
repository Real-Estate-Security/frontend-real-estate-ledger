import { Button } from "@/components/ui/button";
import { CardFooter, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Lock, Mail } from "lucide-react";

interface LoginFormProps {
  onSubmit?: (email: string, password: string) => void;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!onSubmit) return;

    try {
      setIsLoading(true);
      await onSubmit(email, password);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <CardContent className="pt-5">
        <div className="space-y-5">
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
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-gray-50 focus:bg-white transition-colors"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="font-medium">
                Password
              </Label>
              <a
                href="/forgot-password"
                className="text-sm text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-sm"
                tabIndex={0}
              >
                Forgot password?
              </a>
            </div>
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
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 pt-2 pb-6">
        <Button
          className="w-full h-11 font-medium transition-all hover:shadow-md"
          onClick={handleSubmit}
          disabled={isLoading || !email || !password}
        >
          {isLoading ? "Logging in..." : "Log in to your account"}
        </Button>
        <div className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <a
            href="/frontend-real-estate-ledger/register"
            className="text-primary font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-sm"
            tabIndex={0}
          >
            Sign up
          </a>
        </div>
      </CardFooter>
    </>
  );
}
