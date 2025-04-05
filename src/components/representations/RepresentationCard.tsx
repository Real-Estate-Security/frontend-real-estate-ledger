import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";
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
  const {
    id,
    agent_username,
    agent_first_name,
    agent_last_name,
    client_username,
    client_first_name,
    client_last_name,
    start_date,
    end_date,
    status,
    requested_at,
    signed_at,
    is_active,
  } = representation;

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    try {
      return format(parseISO(dateString), "MMM d, yyyy");
    } catch (error) {
      return "Invalid date";
    }
  };

  const formatNullableTime = (
    nullableTime: { time?: string; valid?: boolean } | undefined
  ) => {
    if (!nullableTime) return "N/A";
    const dateString = nullableTime as string;
    if (!dateString) return "N/A";
    try {
      return format(parseISO(dateString), "MMM d, yyyy");
    } catch (error) {
      return "Invalid date";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Representation Agreement
          </h3>
          <p className="text-sm text-gray-500">ID: {id}</p>
        </div>
        <div className="text-right">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              status?.toLowerCase() === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : status?.toLowerCase() === "accepted"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {status
              ? status.charAt(0).toUpperCase() + status.slice(1)
              : "Unknown"}
          </span>
          {is_active !== undefined && (
            <span
              className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                is_active
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {is_active ? "Active" : "Inactive"}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500">Agent</h4>
          <p className="text-gray-900">
            {agent_first_name} {agent_last_name}
          </p>
          <p className="text-sm text-gray-500">@{agent_username}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Client</h4>
          <p className="text-gray-900">
            {client_first_name} {client_last_name}
          </p>
          <p className="text-sm text-gray-500">@{client_username}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500">Start Date</h4>
          <p className="text-gray-900">{formatDate(start_date)}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">End Date</h4>
          <p className="text-gray-900">{formatNullableTime(end_date)}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500">Requested At</h4>
          <p className="text-gray-900">{formatDate(requested_at)}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Signed At</h4>
          <p className="text-gray-900">{formatNullableTime(signed_at)}</p>
        </div>
      </div>

      {canManageRepresentations && (
        <div className="flex justify-end space-x-2 mt-4">
          <Button
            variant="outline"
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => onDecline(id!)}
          >
            Decline
          </Button>
          <Button
            className="bg-green-600 text-white hover:bg-green-700"
            onClick={() => onAccept(id!)}
          >
            Accept
          </Button>
        </div>
      )}
    </div>
  );
}
