CREATE TABLE IF NOT EXISTS "wish" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"animalId" integer NOT NULL
);
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
