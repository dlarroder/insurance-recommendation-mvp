"use client";

import { InsuranceForm } from "@/components/InsuranceForm";
import { RecommendationResult } from "@/components/RecommendationResult";
import { RecommendationResult as RecommendationData } from "@/lib/recommendation-engine";
import { Clock, Shield, TrendingUp, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { useUser } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const [recommendation, setRecommendation] =
    useState<RecommendationData | null>(null);
  const { data: user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/dashboard");
    }
  }, [user, isLoading, router]);

  const handleRecommendation = (rec: RecommendationData) => {
    setRecommendation(rec);
  };

  const handleStartOver = () => {
    setRecommendation(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return null; // Will redirect to dashboard
  }

  if (recommendation) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <RecommendationResult
            recommendation={recommendation}
            onStartOver={handleStartOver}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="text-center flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Life Insurance Recommendation Engine
              </h1>
              <p className="text-lg text-gray-600">
                Get personalized life insurance recommendations based on your
                profile
              </p>
            </div>
            <div className="flex gap-2">
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

      {/* Hero Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Comprehensive Coverage
              </h3>
              <p className="text-sm text-gray-600">
                Get coverage recommendations tailored to your specific needs and
                situation
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Smart Recommendations
              </h3>
              <p className="text-sm text-gray-600">
                Our algorithm considers your age, income, dependents, and risk
                tolerance
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Family Protection
              </h3>
              <p className="text-sm text-gray-600">
                Ensure your loved ones are financially protected with the right
                coverage
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Quick Process
              </h3>
              <p className="text-sm text-gray-600">
                Get your personalized recommendation in minutes, not hours
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Sign up for a personalized experience
            </h3>
            <p className="text-blue-700 mb-4">
              Create an account to save your recommendations and track your insurance journey.
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

          <InsuranceForm onRecommendation={handleRecommendation} />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              Life Insurance Recommendation Engine - A prototype demonstrating
              full-stack development
            </p>
            <p className="text-sm">
              Built with Next.js, TypeScript, PostgreSQL, Drizzle ORM, and
              Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
