import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { useAuthStore } from "@/store/authStore";

export default function Profile() {
  const { user } = useAuthStore();
  const { toast } = useToast();

  if (!user) {
    return (
      <div className="container mx-auto py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">Please log in to view your profile.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">First Name</h3>
              <p className="mt-1 text-lg text-gray-900">{user.first_name}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Last Name</h3>
              <p className="mt-1 text-lg text-gray-900">{user.last_name}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Username</h3>
              <p className="mt-1 text-lg text-gray-900">{user.username}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Email</h3>
              <p className="mt-1 text-lg text-gray-900">{user.email}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Date of Birth
              </h3>
              <p className="mt-1 text-lg text-gray-900">
                {format(new Date(user.dob), "MMMM d, yyyy")}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Role</h3>
              <p className="mt-1 text-lg text-gray-900 capitalize">
                {user.role}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
