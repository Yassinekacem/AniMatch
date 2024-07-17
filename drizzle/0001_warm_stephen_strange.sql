CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"lastname" varchar NOT NULL,
	"password" varchar NOT NULL,
	"email" varchar NOT NULL,
	"image" varchar NOT NULL,
	CONSTRAINT "user_password_unique" UNIQUE("password"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
