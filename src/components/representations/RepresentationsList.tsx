import type { Representation } from "@/services/agentService";
import { RepresentationCard } from "./RepresentationCard";

interface RepresentationsListProps {
  representations: Representation[];
  onAccept: (id: number) => void;
  onDecline: (id: number) => void;
  canManageRepresentations: boolean;
}

export function RepresentationsList({
  representations,
  onAccept,
  onDecline,
  canManageRepresentations,
}: RepresentationsListProps) {
  return (
    <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Representations
      </h2>
      {representations === null || representations.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No representations found
        </p>
      ) : (
        <div className="space-y-4">
          {representations.map((rep) => (
            <RepresentationCard
              key={rep.id}
              representation={rep}
              onAccept={onAccept}
              onDecline={onDecline}
              canManageRepresentations={canManageRepresentations}
            />
          ))}
        </div>
      )}
    </div>
  );
}
