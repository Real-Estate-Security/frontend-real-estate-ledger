import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useAuthStore } from "@/store/authStore";
import {
  getRepresentations,
  acceptRepresentation,
  declineRepresentation,
  type Representation,
} from "@/services/agentService";
import { RepresentationForm } from "@/components/representations/RepresentationForm";
import { RepresentationsList } from "@/components/representations/RepresentationsList";

export default function AgentDashboard() {
  const { toast } = useToast();
  const { user } = useAuthStore();
  const [representations, setRepresentations] = useState<Representation[]>([]);

  const loadRepresentations = async () => {
    try {
      const data = await getRepresentations();
      setRepresentations(data);
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to load representations: ${error}`,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    loadRepresentations();
  }, [toast]);

  const handleAccept = async (id: number) => {
    try {
      await acceptRepresentation(id);
      toast({
        title: "Success",
        description: "Representation request accepted successfully",
      });
      loadRepresentations();
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to accept representation request: ${error}`,
        variant: "destructive",
      });
    }
  };

  const handleDecline = async (id: number) => {
    try {
      await declineRepresentation(id);
      toast({
        title: "Success",
        description: "Representation request declined successfully",
      });
      loadRepresentations();
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to decline representation request: ${error}`,
        variant: "destructive",
      });
    }
  };

  const canManageRepresentations =
    user?.role === "user" || user?.role === "admin";

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">
        Agent Representation Agreements
      </h1>
      {user?.role === "agent" && (
        <RepresentationForm onSuccess={loadRepresentations} />
      )}
      <RepresentationsList
        representations={representations}
        onAccept={handleAccept}
        onDecline={handleDecline}
        canManageRepresentations={canManageRepresentations}
      />
    </div>
  );
}
