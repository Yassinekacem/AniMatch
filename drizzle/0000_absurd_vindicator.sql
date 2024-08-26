DO $$ BEGIN
 CREATE TYPE "public"."breedValues" AS ENUM('Labrador', 'Rottweiler', 'Berger Allemand', 'Berger noir', 'Malinois', 'Husky', 'Caniche', 'Chihuahuah', 'Dobermann', 'Pitbull', 'Bichon', 'Others', 'Siamois', 'Persan', 'Bengal', 'Scottish Fold', 'Ragdoll', 'sphynx', 'snowshoe', 'himalayan');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."cityValues" AS ENUM('Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Nabeul', 'Zaghouan', 'Bizerte', 'Beja', 'Jendouba', 'Kef', 'Siliana', 'Kairouan', 'Sousse', 'Mahdia', 'Monastir', 'Sfax', 'Gabes', 'Mednine', 'Tozeur', 'Gafsa', 'Kasserine', 'Sidi Bouzid', 'Tataouine', 'Gbelli');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."speciesValues" AS ENUM('Dog', 'Cat');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."invitationValues" AS ENUM('pended', 'accepted', 'rejected');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "animals" (
	"id" serial PRIMARY KEY NOT NULL,
	"breed" "breedValues" NOT NULL,
	"gender" varchar NOT NULL,
	"species" "speciesValues" NOT NULL,
	"name" varchar NOT NULL,
	"city" "cityValues" NOT NULL,
	"age" integer NOT NULL,
	"vaccinated" boolean NOT NULL,
	"trained" boolean NOT NULL,
	"friendly" boolean NOT NULL,
	"available" boolean DEFAULT true NOT NULL,
	"description" text NOT NULL,
	"image" varchar[] NOT NULL,
	"ownerId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"content" text NOT NULL,
	"rate" integer NOT NULL,
	"userPhoto" text NOT NULL,
	"firstName" text NOT NULL,
	"lastName" text NOT NULL,
	"animalId" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invitations" (
	"id" serial PRIMARY KEY NOT NULL,
	"status" "invitationValues" DEFAULT 'pended' NOT NULL,
	"senderId" integer NOT NULL,
	"receiverId" integer NOT NULL,
	"animalId" integer NOT NULL,
	"date" date DEFAULT 'now()' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"clerkId" text NOT NULL,
	"firstName" text NOT NULL,
	"lastName" text NOT NULL,
	"photo" text NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wishs" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"animalId" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "animals" ADD CONSTRAINT "animals_ownerId_users_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_animalId_animals_id_fk" FOREIGN KEY ("animalId") REFERENCES "public"."animals"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invitations" ADD CONSTRAINT "invitations_senderId_users_id_fk" FOREIGN KEY ("senderId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invitations" ADD CONSTRAINT "invitations_receiverId_animals_ownerId_fk" FOREIGN KEY ("receiverId") REFERENCES "public"."animals"("ownerId") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invitations" ADD CONSTRAINT "invitations_animalId_animals_id_fk" FOREIGN KEY ("animalId") REFERENCES "public"."animals"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wishs" ADD CONSTRAINT "wishs_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wishs" ADD CONSTRAINT "wishs_animalId_animals_id_fk" FOREIGN KEY ("animalId") REFERENCES "public"."animals"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
