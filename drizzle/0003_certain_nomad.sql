ALTER TABLE "animal" DROP CONSTRAINT "animal_ownerId_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "animal" ADD CONSTRAINT "animal_ownerId_user_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
