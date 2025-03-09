"use client"

import * as React from "react"
import Link from "next/link"
import { useSession, signOut, signIn } from "next-auth/react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { IconLogout, IconUser, IconLogin } from "@tabler/icons-react"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Theory of Machines",
    href: "/theory-of-machines",
    description:
      "Find models related to the Theory of Machines.",
  },
  {
    title: "Manufacturing Technology",
    href: "/manufacturing-technology",
    description:
      "Find models related to the Manufacturing Technology.",
  },
  {
    title: "Machine and Machine Tools",
    href: "/machine-and-machine-tools",
    description:
      "Find models related to the Machine and Machine Tools.",
  },
  {
    title: "Solid Modeling",
    href: "/solid-modeling",
    description: "Find models related to the Solid Modeling.",
  },
  {
    title: "Thermodynamics",
    href: "/thermodynamics",
    description:
      "Find models related to the Thermodynamics.",
  },
  {
    title: "Miscellaneous",
    href: "/miscellaneous",
    description:
      "Find models under Miscellaneous category.",
  },
]

export default function Navbar() {
  const { data: session } = useSession();

  const handleSignIn = async () => {
    try {
      await signIn("google", { 
        callbackUrl: "/",
        redirect: true
      });
      toast.success("Welcome back!", {
        description: "You have successfully signed in."
      });
    } catch (error) {
      toast.error("Failed to sign in", {
        description: "Please try again."
      });
    }
  }

  const handleSignUp = async () => {
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
  }

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: "/" });
      toast.success("Goodbye!", {
        description: "You have been signed out successfully."
      });
    } catch (error) {
      toast.error("Failed to sign out", {
        description: "Please try again."
      });
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 w-full border-b border-gray-200 dark:border-gray-800 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold dark:text-white">
            ThreeD
          </Link>
          <div className="flex items-center gap-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-violet-500 to-purple-500 p-6 no-underline outline-none focus:shadow-md"
                            href="/explore"
                          >
                            <div className="mt-4 mb-2 text-lg font-medium text-white">
                              Library
                            </div>
                            <p className="text-sm leading-tight text-white/90">
                              Explore our vast collection of 3D models shared by the community.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/dashboard" title="Manage Your CADs">
                        View and manage your saved and uploaded 3D models.
                      </ListItem>
                      <ListItem href="/upload" title="Upload Model">
                        Share your own 3D models with the community.
                      </ListItem>
                      <ListItem href="/request" title="Request Model">
                        Can't find what you need? Request a specific model.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Subjects</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {components.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/about" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      About
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
              <NavigationMenuViewport />
            </NavigationMenu>

            {/* Avatar with Dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-9 w-9 p-0 hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent [&>svg]:hidden">
                    <div className="aspect-square w-9 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 p-[2px] cursor-pointer hover:from-violet-600 hover:to-purple-600 transition-all">
                      <div className="aspect-square w-full rounded-full bg-white dark:bg-black overflow-hidden flex items-center justify-center">
                        <img
                          src={session?.user?.image || "https://api.dicebear.com/7.x/bottts/svg?seed=Felix&backgroundColor=transparent"}
                          alt="Profile"
                          className="aspect-square w-full h-full"
                        />
                      </div>
                    </div>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-[200px] p-2">
                      {session ? (
                        <>
                          <ListItem 
                            href="/profile" 
                            title={session.user?.name || "Profile"}
                            icon={<IconUser className="h-4 w-4" />}
                          >
                            Manage your account
                          </ListItem>
                          <ListItem 
                            href="#"
                            onClick={handleSignOut}
                            title="Log Out"
                            icon={<IconLogout className="h-4 w-4" />}
                            className="text-red-500 hover:text-red-600"
                          >
                            Sign out of your account
                          </ListItem>
                        </>
                      ) : (
                        <>
                          <ListItem 
                            href="#"
                            onClick={handleSignIn}
                            title="Log In"
                            icon={<IconLogin className="h-4 w-4" />}
                          >
                            Sign in to your account
                          </ListItem>
                          <ListItem 
                            href="#"
                            onClick={handleSignUp}
                            title="Sign Up"
                            icon={<IconUser className="h-4 w-4" />}
                          >
                            Create a new account
                          </ListItem>
                        </>
                      )}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
              <NavigationMenuViewport />
            </NavigationMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "relative block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2">
            {icon}
            <div>
              <div className="text-sm font-medium leading-none mb-1">{title}</div>
              <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                {children}
              </p>
            </div>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  )
})

ListItem.displayName = "ListItem"