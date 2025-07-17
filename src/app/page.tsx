"use client";

import Header from "@/components/Header";
import InfoSection from "@/components/InfoSection";
import { InsuranceForm } from "@/components/InsuranceForm";
import { RecommendationResult } from "@/components/RecommendationResult";
import SignUpBanner from "@/components/SignUpBanner";
import { useUser } from "@/lib/auth-client";
import { RecommendationResult as RecommendationData } from "@/lib/recommendation-engine";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";

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
      <Header />
      <section className="py-12">
        <div className="container mx-auto px-4">
          <SignUpBanner />
          <InfoSection />
          <InsuranceForm onRecommendation={handleRecommendation} />
        </div>
      </section>
      <Footer />
    </div>
  );
}
