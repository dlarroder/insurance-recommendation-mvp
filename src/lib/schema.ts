import {
  boolean,
  decimal,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const userSubmissions = pgTable("user_submissions", {
  id: uuid("id").primaryKey().defaultRandom(),
  age: integer("age").notNull(),
  income: decimal("income", { precision: 10, scale: 2 }).notNull(),
  dependents: integer("dependents").notNull(),
  riskTolerance: varchar("risk_tolerance", { length: 20 }).notNull(), // 'low', 'medium', 'high'
  createdAt: timestamp("created_at").defaultNow().notNull(),
  recommendationId: uuid("recommendation_id").references(
    () => recommendations.id
  ),
});

export const recommendations = pgTable("recommendations", {
  id: uuid("id").primaryKey().defaultRandom(),
  productType: varchar("product_type", { length: 50 }).notNull(), // 'term', 'whole', 'universal'
  coverageAmount: decimal("coverage_amount", {
    precision: 12,
    scale: 2,
  }).notNull(),
  termYears: integer("term_years"), // null for whole life
  monthlyPremium: decimal("monthly_premium", {
    precision: 8,
    scale: 2,
  }).notNull(),
  explanation: text("explanation").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insuranceProducts = pgTable("insurance_products", {
  id: uuid("id").primaryKey().defaultRandom(),
  type: varchar("type", { length: 50 }).notNull(), // 'term', 'whole', 'universal'
  name: varchar("name", { length: 100 }).notNull(),
  baseRate: decimal("base_rate", { precision: 5, scale: 4 }).notNull(), // rate per $1000 of coverage
  maxCoverage: decimal("max_coverage", { precision: 12, scale: 2 }).notNull(),
  minAge: integer("min_age").notNull(),
  maxAge: integer("max_age").notNull(),
  termOptions: varchar("term_options", { length: 100 }), // '10,20,30' for term life
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type UserSubmission = typeof userSubmissions.$inferSelect;
export type NewUserSubmission = typeof userSubmissions.$inferInsert;
export type Recommendation = typeof recommendations.$inferSelect;
export type NewRecommendation = typeof recommendations.$inferInsert;
export type InsuranceProduct = typeof insuranceProducts.$inferSelect;
export type NewInsuranceProduct = typeof insuranceProducts.$inferInsert;
