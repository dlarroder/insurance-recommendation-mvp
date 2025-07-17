import { db } from "@/lib/db";
import { RecommendationEngine } from "@/lib/recommendation-engine";
import { userSubmissions } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const formSchema = z.object({
  age: z.number().min(18).max(100),
  income: z.number().min(0).max(10000000),
  dependents: z.number().min(0).max(20),
  riskTolerance: z.enum(["low", "medium", "high"]),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = formSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid input data", details: validation.error.issues },
        { status: 400 }
      );
    }

    const { age, income, dependents, riskTolerance } = validation.data;

    // Generate recommendation
    const engine = new RecommendationEngine();
    const recommendation = await engine.generateRecommendation({
      age,
      income,
      dependents,
      riskTolerance,
    });

    // Store user submission
    await db.insert(userSubmissions).values({
      age,
      income: income.toString(),
      dependents,
      riskTolerance,
      recommendationId: recommendation.id,
    });

    return NextResponse.json({
      success: true,
      recommendation,
    });
  } catch (error) {
    console.error("Error generating recommendation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Life Insurance Recommendation API",
    version: "1.0.0",
    endpoints: {
      POST: "/api/recommendation - Generate recommendation",
    },
  });
}
