import { integer, varchar, boolean, pgTable, text, pgEnum , serial} from "drizzle-orm/pg-core";

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
});
