"use client";

import { signIn } from "next-auth/react";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", { 
        callbackUrl: "/",
        redirect: true
      });
      toast.success("Welcome to ThreeD!", {
        description: "Your account has been created successfully."
      });
    } catch (error) {
      toast.error("Failed to create account", {
        description: "Please try again."
      });
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
          <CardDescription>
            Sign up to start exploring 3D visualization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full flex items-center gap-2 h-12"
            onClick={handleGoogleSignIn}
          >
            <IconBrandGoogle className="h-5 w-5" />
            Continue with Google
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Already have an account?
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push('/login')}
          >
            Sign In
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 