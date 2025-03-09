"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconSend } from "@tabler/icons-react";
import { UserAvatar } from "@/components/ui/user-avatar";

interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  timestamp: Date;
}

interface User {
  id: string;
  name: string;
  image: string;
  username: string;
}

// Mock data - replace with actual data fetching
const mockUser: User = {
  id: "user1",
  name: "John Doe",
  image: "",
  username: "johndoe",
};

const mockMessages: Message[] = [
  {
    id: "1",
    content: "Hey, I'm interested in your CAD model!",
    senderId: "currentUser",
    receiverId: "user1",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
  },
  {
    id: "2",
    content: "Thanks! What would you like to know?",
    senderId: "user1",
    receiverId: "currentUser",
    timestamp: new Date(Date.now() - 1000 * 60 * 4), // 4 minutes ago
  },
];

export default function MessagesPage({ params }: { params: { userId: string } }) {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Simulate API call to fetch user
    setUser(mockUser);
  }, [params.userId]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      senderId: "currentUser",
      receiverId: params.userId,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <Card className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="border-b p-4">
            <UserAvatar user={user} showName avatarClassName="h-10 w-10" />
          </div>

          {/* Messages */}
          <div className="h-[500px] overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.senderId === "currentUser" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.senderId === "currentUser"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p>{message.content}</p>
                  <p className="mt-1 text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex gap-2"
            >
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <IconSend className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
} 