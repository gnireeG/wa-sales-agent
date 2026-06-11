ALTER TABLE "customer" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "customer" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;