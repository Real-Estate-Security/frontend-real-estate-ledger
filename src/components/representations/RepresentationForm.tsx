import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { format, parseISO } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { requestRepresentation } from "@/services/agentService";

interface RepresentationFormProps {
  onSuccess: () => void;
}

export function RepresentationForm({ onSuccess }: RepresentationFormProps) {
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [isLoading, setIsLoading] = useState(false);

  // Helper function to create a date at noon UTC
  const createDateAtNoon = (dateString: string): Date => {
    const date = parseISO(dateString);
    // Set to noon to avoid timezone issues
    date.setHours(12, 0, 0, 0);
    return date;
  };

  const validateDates = () => {
    if (!startDate) {
      toast({
        title: "Error",
        description: "Start date is required",
        variant: "destructive",
      });
      return false;
    }

    const today = new Date();
    today.setHours(12, 0, 0, 0);

    if (startDate < today) {
      toast({
        title: "Error",
        description: "Start date cannot be in the past",
        variant: "destructive",
      });
      return false;
    }

    if (endDate && endDate <= startDate) {
      toast({
        title: "Error",
        description: "End date must be after start date",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !startDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (!validateDates()) {
      return;
    }

    setIsLoading(true);
    try {
      await requestRepresentation(username, startDate, endDate);
      toast({
        title: "Success",
        description: "Representation request sent successfully",
      });
      setUsername("");
      setStartDate(undefined);
      setEndDate(undefined);
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to send representation request: ${error}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm mb-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        New Representation Agreement
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <div className="flex flex-col space-y-1">
            <Label htmlFor="username" className="text-gray-700">
              Client Username
            </Label>
            <p className="text-sm text-gray-500 mb-2">
              Enter the username of the client you wish to represent. The client
              will need to accept your representation request.
            </p>
          </div>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter client username"
            className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-gray-700">Start Date</Label>
            <div className="relative">
              <Input
                type="date"
                required
                value={startDate ? format(startDate, "yyyy-MM-dd") : ""}
                onChange={(e) => {
                  if (e.target.value) {
                    setStartDate(createDateAtNoon(e.target.value));
                  } else {
                    setStartDate(undefined);
                  }
                }}
                className="pl-10 bg-gray-50 border-gray-200 text-gray-900 focus:bg-white focus:border-blue-500 transition-colors"
                min={format(new Date(), "yyyy-MM-dd")}
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
                      <CalendarIcon className="h-4 w-4 text-gray-400" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={(date) => {
                        if (date) {
                          // Ensure the date is set to noon to avoid timezone issues
                          date.setHours(12, 0, 0, 0);
                          setStartDate(date);
                        } else {
                          setStartDate(undefined);
                        }
                      }}
                      initialFocus
                      disabled={(date) => {
                        const today = new Date();
                        today.setHours(12, 0, 0, 0);
                        return date < today;
                      }}
                      className="bg-white border border-gray-200"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-700">End Date</Label>
            <div className="relative">
              <Input
                type="date"
                value={endDate ? format(endDate, "yyyy-MM-dd") : ""}
                onChange={(e) => {
                  if (e.target.value) {
                    setEndDate(createDateAtNoon(e.target.value));
                  } else {
                    setEndDate(undefined);
                  }
                }}
                className="pl-10 bg-gray-50 border-gray-200 text-gray-900 focus:bg-white focus:border-blue-500 transition-colors"
                min={
                  startDate
                    ? format(startDate, "yyyy-MM-dd")
                    : format(new Date(), "yyyy-MM-dd")
                }
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
                      <CalendarIcon className="h-4 w-4 text-gray-400" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={(date) => {
                        if (date) {
                          // Ensure the date is set to noon to avoid timezone issues
                          date.setHours(12, 0, 0, 0);
                          setEndDate(date);
                        } else {
                          setEndDate(undefined);
                        }
                      }}
                      initialFocus
                      disabled={(date) => {
                        const today = new Date();
                        today.setHours(12, 0, 0, 0);
                        return (
                          date < today ||
                          (startDate ? date <= startDate : false)
                        );
                      }}
                      className="bg-white border border-gray-200"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white hover:bg-blue-700"
        >
          {isLoading ? "Sending..." : "Request Representation"}
        </Button>
      </form>
    </div>
  );
}
