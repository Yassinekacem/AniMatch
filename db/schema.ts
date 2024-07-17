import { integer, varchar, boolean, pgTable, text, pgEnum, serial } from "drizzle-orm/pg-core";

export const SpeciesValues = pgEnum("speciesValues", ["Dog", "Cat"]);

export const animal = pgTable("animal", {
  id: serial("id").primaryKey(),
  breed: varchar("breed").notNull(),
  species: SpeciesValues("species").notNull(),
  name: varchar("name").notNull(),
  age: integer("age").notNull(),
  vaccinated: boolean("vaccinated").notNull(),
  trained: boolean("trained").notNull(),
  friendly: boolean("friendly").notNull(),
  available: boolean("available").notNull().default(true),
  description: text("description").notNull(),
  image: varchar("image").notNull(),
<<<<<<< HEAD
  ownerId: integer("ownerId").notNull().references(() => user.id), // Add foreign key reference
=======
  userId: integer("userId").notNull().references("user", "id"),
>>>>>>> 7dda215dc73f1611102fbee053e365b32790fca3
});

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  lastname: varchar("lastname").notNull(),
  password: varchar("password").notNull().unique(),
  email: varchar("email").notNull().unique(),
  image: varchar("image").notNull(),
});
