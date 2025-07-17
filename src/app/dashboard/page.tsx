"use client";

import { UserButton } from "@/components/auth/user-button";
import { InsuranceForm } from "@/components/InsuranceForm";
import { RecommendationResult } from "@/components/RecommendationResult";
import { useUser } from "@/lib/auth-client";
import { RecommendationResult as RecommendationData } from "@/lib/recommendation-engine";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { data: user, isLoading } = useUser();
  const router = useRouter();
  const [recommendation, setRecommendation] =
    useState<RecommendationData | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/sign-in");
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

  if (!user) {
    return null;
  }

  if (recommendation) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Your Insurance Recommendation
            </h1>
            <UserButton />
          </div>
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
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="text-center flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Life Insurance Recommendation Engine
              </h1>
              <p className="text-lg text-gray-600">
                Get personalized life insurance recommendations
              </p>
            </div>
            <UserButton />
          </div>
        </div>
      </header>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome, {user.name}!
            </h2>
            <p className="text-gray-600">
              Complete the form below to get your personalized insurance
              recommendation.
            </p>
          </div>

          <InsuranceForm onRecommendation={handleRecommendation} />
        </div>
      </section>
    </div>
  );
}
