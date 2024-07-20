CREATE TABLE IF NOT EXISTS "wish" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"animalId" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "animal" RENAME COLUMN "ownerId" TO "userId";--> statement-breakpoint
ALTER TABLE "animal" DROP CONSTRAINT "animal_ownerId_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wish" ADD CONSTRAINT "wish_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wish" ADD CONSTRAINT "wish_animalId_animal_id_fk" FOREIGN KEY ("animalId") REFERENCES "public"."animal"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "animal" ADD CONSTRAINT "animal_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
