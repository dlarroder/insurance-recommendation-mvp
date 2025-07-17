import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Test database connection and table availability
    await db.execute("SELECT 1 FROM user_submissions LIMIT 1");
    await db.execute("SELECT 1 FROM recommendations LIMIT 1");
    await db.execute("SELECT 1 FROM insurance_products LIMIT 1");

    return NextResponse.json({
      status: "ready",
      timestamp: new Date().toISOString(),
      database: "ready",
      tables: ["user_submissions", "recommendations", "insurance_products"],
    });
  } catch (error) {
    console.error("Readiness check failed:", error);

    return NextResponse.json(
      {
        status: "not_ready",
        timestamp: new Date().toISOString(),
        database: "not_ready",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 503 }
    );
  }
}
