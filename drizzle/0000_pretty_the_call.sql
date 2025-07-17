CREATE TABLE "insurance_products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" varchar(50) NOT NULL,
	"name" varchar(100) NOT NULL,
	"base_rate" numeric(5, 4) NOT NULL,
	"max_coverage" numeric(12, 2) NOT NULL,
	"min_age" integer NOT NULL,
	"max_age" integer NOT NULL,
	"term_options" varchar(100),
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "recommendations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_type" varchar(50) NOT NULL,
	"coverage_amount" numeric(12, 2) NOT NULL,
	"term_years" integer,
	"monthly_premium" numeric(8, 2) NOT NULL,
	"explanation" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"age" integer NOT NULL,
	"income" numeric(10, 2) NOT NULL,
	"dependents" integer NOT NULL,
	"risk_tolerance" varchar(20) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"recommendation_id" uuid
);
--> statement-breakpoint
ALTER TABLE "user_submissions" ADD CONSTRAINT "user_submissions_recommendation_id_recommendations_id_fk" FOREIGN KEY ("recommendation_id") REFERENCES "public"."recommendations"("id") ON DELETE no action ON UPDATE no action;