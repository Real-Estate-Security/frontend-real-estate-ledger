import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import type { Representation } from "@/services/agentService";

interface RepresentationCardProps {
  representation: Representation;
  onAccept: (id: number) => void;
  onDecline: (id: number) => void;
  canManageRepresentations: boolean;
}

export function RepresentationCard({
  representation,
  onAccept,
  onDecline,
  canManageRepresentations,
}: RepresentationCardProps) {
  // Function to determine status color
  const getStatusColor = (status: string | undefined) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "text-amber-600";
      case "accepted":
        return "text-emerald-600";
      case "rejected":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="flex items-center justify-between p-6 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">
          Representation #{representation.id}
        </h3>
        <div className="space-y-1">
          <p className="text-sm text-gray-700 flex items-center gap-2">
            <span className="text-gray-500">Start Date:</span>
            {format(new Date(representation.start_date || ""), "PPP")}
          </p>
          <p className="text-sm text-gray-700 flex items-center gap-2">
            <span className="text-gray-500">End Date:</span>
            {representation.end_date?.valid
              ? format(new Date(representation.end_date.time || ""), "PPP")
              : "No end date"}
          </p>
          <p className="text-sm flex items-center gap-2">
            <span className="text-gray-500">Status:</span>
            <span className={getStatusColor(representation.status)}>
              {representation.status}
            </span>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {canManageRepresentations && representation.status === "pending" && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => representation.id && onAccept(representation.id)}
              className="hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-colors"
            >
              Accept
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => representation.id && onDecline(representation.id)}
              className="hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
            >
              Decline
            </Button>
          </div>
        )}
        <div
          className={`px-4 py-1.5 rounded-full text-sm font-medium ${
            representation.is_active
              ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
              : "bg-red-50 text-red-600 border border-red-200"
          }`}
        >
          {representation.is_active ? "Active" : "Inactive"}
        </div>
      </div>
    </div>
  );
}
