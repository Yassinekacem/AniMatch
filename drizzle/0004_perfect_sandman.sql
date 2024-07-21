DO $$ BEGIN
 CREATE TYPE "public"."invitationValues" AS ENUM('pended', 'accepted', 'rejected');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invitation" (
	"id" serial PRIMARY KEY NOT NULL,
	"status" "invitationValues" DEFAULT 'pended' NOT NULL,
	"senderId" integer NOT NULL,
	"receiverId" integer NOT NULL,
	"animalId" integer NOT NULL,
	"date" date DEFAULT 'now()' NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invitation" ADD CONSTRAINT "invitation_senderId_user_id_fk" FOREIGN KEY ("senderId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invitation" ADD CONSTRAINT "invitation_receiverId_animal_ownerId_fk" FOREIGN KEY ("receiverId") REFERENCES "public"."animal"("ownerId") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invitation" ADD CONSTRAINT "invitation_animalId_animal_id_fk" FOREIGN KEY ("animalId") REFERENCES "public"."animal"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
