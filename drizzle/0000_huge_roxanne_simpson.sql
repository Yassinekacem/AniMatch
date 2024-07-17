DO $$ BEGIN
 CREATE TYPE "public"."speciesValues" AS ENUM('Dog', 'Cat');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "animal" (
	"id" serial PRIMARY KEY NOT NULL,
	"breed" varchar NOT NULL,
	"species" "speciesValues" NOT NULL,
	"name" varchar NOT NULL,
	"age" integer NOT NULL,
	"vaccinated" boolean NOT NULL,
	"trained" boolean NOT NULL,
	"friendly" boolean NOT NULL,
	"available" boolean DEFAULT true NOT NULL,
	"description" text NOT NULL,
	"image" varchar NOT NULL
);
