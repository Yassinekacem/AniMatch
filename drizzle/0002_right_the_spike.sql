ALTER TABLE "animal" ADD COLUMN "ownerId" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "animal" ADD CONSTRAINT "animal_ownerId_user_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
