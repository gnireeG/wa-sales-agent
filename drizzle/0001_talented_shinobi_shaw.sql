CREATE TABLE "customer" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"state" text DEFAULT 'lead' NOT NULL,
	"notes" text
);
--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "image";