"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  user: {
    id: string;
    name?: string | null;
    image?: string | null;
    username?: string;
  };
  showName?: boolean;
  className?: string;
  avatarClassName?: string;
}

export function UserAvatar({ user, showName = false, className = "", avatarClassName = "h-8 w-8" }: UserAvatarProps) {
  return (
    <Link 
      href={`/user/${user.id}`}
      className={`flex items-center gap-2 hover:opacity-80 transition-opacity ${className}`}
    >
      <Avatar className={avatarClassName}>
        <AvatarImage src={user.image || ""} alt={user.name || "User"} />
        <AvatarFallback>{user.name?.[0]}</AvatarFallback>
      </Avatar>
      {showName && (
        <div className="flex flex-col">
          <span className="text-sm font-medium leading-none">{user.name}</span>
          {user.username && (
            <span className="text-xs text-muted-foreground">@{user.username}</span>
          )}
        </div>
      )}
    </Link>
  );
} 