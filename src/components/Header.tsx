import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Life Insurance Recommendation Engine
            </h1>
            <p className="text-base sm:text-lg text-gray-600">
              Get personalized life insurance recommendations based on your
              profile
            </p>
          </div>
          <div className="flex gap-2 justify-center sm:justify-end flex-shrink-0">
            <Button asChild variant="outline">
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
