import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Test database connection
    await db.execute("SELECT 1");

    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      database: "connected",
      version: "1.0.0",
      environment: process.env.NODE_ENV || "development",
    });
  } catch (error) {
    console.error("Health check failed:", error);

    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        database: "disconnected",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 503 }
    );
  }
}
