import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/remix";
import { Link } from "@remix-run/react";
import { PuzzleIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function HomeHeader() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link to="#" className="flex items-center justify-center">
        <PuzzleIcon className="h-6 w-6" />
        <span className="sr-only">My Quiz App</span>
      </Link>
      <nav className="ml-auto flex gap-4 items-center sm:gap-6">
        <Link to="#home" className="text-sm font-medium hover:underline underline-offset-4">
          Home
        </Link>
        <Link to="#feature" className="text-sm font-medium hover:underline underline-offset-4">
          Feature
        </Link>
        <SignedIn>
          <Button asChild>
            <UserButton />
          </Button>
        </SignedIn>
        <SignedOut>
          <Button asChild>
            <SignInButton />
          </Button>
        </SignedOut>
      </nav>
    </header>
  );
}
