"use client";

import React, { useEffect } from "react";
import { useUserDetail } from "../hooks/useUserDetail";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { toast } from "sonner";
import ErrorState from "@/components/shared/error-state";
import DetailField from "@/components/shared/detail-field";
import { notFound } from "next/navigation";

const UserInformationLoading = () => {
  return (
    <Card>
      <CardHeader>
        <div className="space-y-2">
          <Skeleton className="h-6 w-[200px]" />
          <Skeleton className="h-4 w-[300px]" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-5 w-36" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

interface UserInformationProps {
  userId: string;
}

const UserInformation = ({ userId }: UserInformationProps) => {
  const { data: user, isLoading, error, refetch } = useUserDetail(userId);
  useEffect(() => {
    if (error) {
      toast.error("Failed to load profile", {
        description: error.message || "Could not retrieve user details.",
      });
    }
  }, [error]);

  if (isLoading) {
    return <UserInformationLoading />;
  }

  if (!user && !isLoading) notFound();

  if (error || !user) {
    return (
      <Card>
        <CardContent className="py-12">
          <ErrorState
            title="Error Loading Profile"
            description="Could not load profile details for this user. Please check your connection and try again."
            onRetry={refetch}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg md:text-xl font-semibold">User Information</CardTitle>
        <CardDescription>Detail information about {user.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
          <DetailField label="Name">{user.name}</DetailField>
          <DetailField label="Username">@{user.username}</DetailField>
          <DetailField label="Email">{user.email}</DetailField>
          <DetailField label="Phone">{user.phone}</DetailField>
          <DetailField label="Website">
            <Link
              href={`https://${user.website}`}
              target="_blank"
              className="text-secondary underline font-medium cursor-pointer transition duration-150 hover:opacity-80"
            >
              {user.website}
            </Link>
          </DetailField>
          <DetailField label="Company">{user.company?.name}</DetailField>
          <DetailField label="Catchphrase">{user.company?.catchPhrase}</DetailField>
          <DetailField label="Address">
            {user.address?.street}, {user.address?.suite}
          </DetailField>
          <DetailField label="City">{user.address?.city}</DetailField>
          <DetailField label="Zipcode">{user.address?.zipcode}</DetailField>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInformation;
