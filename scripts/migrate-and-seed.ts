import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { insuranceProducts } from "../src/lib/schema";

// Load environment variables
config({ path: ".env.local" });

const connectionString = process.env.DATABASE_URL!;

async function main() {
  console.log("Starting database migration and seeding...");

  // Create database connection
  const migrationClient = postgres(connectionString, { max: 1 });
  const db = drizzle(migrationClient);

  try {
    // Run migrations
    console.log("Running migrations...");
    await migrate(db, { migrationsFolder: "drizzle" });
    console.log("Migrations completed successfully!");

    // Seed insurance products
    console.log("Seeding insurance products...");
    await seedInsuranceProducts(db);
    console.log("Insurance products seeded successfully!");

    console.log("Database setup completed successfully!");
  } catch (error) {
    console.error("Database setup failed:", error);
    process.exit(1);
  } finally {
    await migrationClient.end();
  }
}

async function seedInsuranceProducts(db: ReturnType<typeof drizzle>) {
  const products = [
    {
      type: "term",
      name: "FlexTerm Life 20",
      baseRate: "0.0008",
      maxCoverage: "2000000",
      minAge: 18,
      maxAge: 65,
      termOptions: "10,20,30",
    },
    {
      type: "whole",
      name: "LifeBuilder Whole Life",
      baseRate: "0.0035",
      maxCoverage: "1000000",
      minAge: 18,
      maxAge: 75,
      termOptions: null,
    },
    {
      type: "universal",
      name: "FlexChoice Universal",
      baseRate: "0.0022",
      maxCoverage: "1500000",
      minAge: 18,
      maxAge: 70,
      termOptions: null,
    },
  ];

  for (const product of products) {
    await db.insert(insuranceProducts).values(product);
  }
}

main();
