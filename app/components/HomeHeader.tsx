import { Link } from "@remix-run/react";
import { PuzzleIcon } from "lucide-react";

export default function HomeHeader() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link to="#" className="flex items-center justify-center">
        <PuzzleIcon className="h-6 w-6" />
        <span className="sr-only">My Quiz App</span>
      </Link>
      <nav className="ml-auto flex gap-4 items-center sm:gap-6">
        <Link to="#" className="text-sm font-medium hover:underline underline-offset-4">
          Features
        </Link>
        <Link to="#" className="text-sm font-medium hover:underline underline-offset-4">
          About
        </Link>
        <Link
          to="#"
          className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          Login
        </Link>
      </nav>
    </header>
  );
}
