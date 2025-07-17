"use client";

import { useUser, signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export function UserButton() {
  const { data: user } = useUser();

  const handleSignOut = async () => {
    await signOut();
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        <User className="h-4 w-4" />
        <span className="text-sm font-medium">{user.name}</span>
      </div>
      <Button variant="outline" size="sm" onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  );
}