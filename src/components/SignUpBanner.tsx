import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignUpBanner() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
      <h3 className="text-lg font-semibold text-blue-900 mb-2">
        Sign up for a personalized experience
      </h3>
      <p className="text-blue-700 mb-4">
        Create an account to save your recommendations and track your insurance
        journey.
      </p>
      <div className="flex gap-2">
        <Button asChild>
          <Link href="/sign-up">Get Started</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/sign-in">Sign In</Link>
        </Button>
      </div>
    </div>
  );
}
