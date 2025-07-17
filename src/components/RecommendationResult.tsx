"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecommendationResult as RecommendationData } from "@/lib/recommendation-engine";
import { Calendar, CheckCircle, DollarSign, Info, Shield } from "lucide-react";

interface RecommendationResultProps {
  recommendation: RecommendationData;
  onStartOver: () => void;
}

export function RecommendationResult({
  recommendation,
  onStartOver,
}: RecommendationResultProps) {
  const {
    productType,
    coverageAmount,
    termYears,
    monthlyPremium,
    explanation,
  } = recommendation;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <CheckCircle className="h-6 w-6" />
            Your Personalized Recommendation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-4">
            <h2 className="text-3xl font-bold text-green-800 mb-2">
              {productType}
            </h2>
            <p className="text-lg text-green-700">
              {coverageAmount} Coverage
              {termYears && ` for ${termYears} years`}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-white rounded-lg border">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Coverage Amount
                </p>
                <p className="text-xl font-bold text-gray-900">
                  {coverageAmount}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-white rounded-lg border">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Monthly Premium
                </p>
                <p className="text-xl font-bold text-gray-900">
                  {monthlyPremium}
                </p>
              </div>
            </div>

            {termYears && (
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg border">
                <Calendar className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Term Length
                  </p>
                  <p className="text-xl font-bold text-gray-900">
                    {termYears} years
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 p-4 bg-white rounded-lg border">
              <Info className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Product Type
                </p>
                <p className="text-xl font-bold text-gray-900">{productType}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Why This Recommendation?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{explanation}</p>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">Next Steps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              1
            </div>
            <div>
              <p className="font-medium text-blue-800">
                Review Your Recommendation
              </p>
              <p className="text-sm text-blue-700">
                Take time to understand the coverage and benefits of{" "}
                {productType}.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              2
            </div>
            <div>
              <p className="font-medium text-blue-800">Compare Options</p>
              <p className="text-sm text-blue-700">
                Consider comparing quotes from multiple insurance providers.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              3
            </div>
            <div>
              <p className="font-medium text-blue-800">Speak with an Agent</p>
              <p className="text-sm text-blue-700">
                Consult with a licensed insurance agent to finalize your policy.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button
          onClick={onStartOver}
          variant="outline"
          className="w-full sm:w-auto"
        >
          Get Another Recommendation
        </Button>
      </div>
    </div>
  );
}
