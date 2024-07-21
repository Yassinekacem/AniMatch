import { integer, varchar, boolean, pgTable, text, pgEnum, serial , date } from "drizzle-orm/pg-core";

export const SpeciesValues = pgEnum("speciesValues", ["Dog", "Cat"]);
export const invitationValues = pgEnum("invitationValues", ["pended", "accepted", "rejected"]); 

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
  ownerId: integer("ownerId").notNull().references(() => user.id, { onDelete: 'cascade' }), // Add foreign key reference with cascade
});

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  lastname: varchar("lastname").notNull(),
  password: varchar("password").notNull().unique(),
  email: varchar("email").notNull().unique(),
  image: varchar("image").notNull(),
}); 



export const wish = pgTable("wish", { 
  id : serial("id").primaryKey(),
  userId  : integer("userId").notNull().references(() => user.id, { onDelete: 'cascade' }), 
  animalId  :  integer("animalId").notNull().references(() => animal.id, { onDelete: 'cascade' }), 
})


export const invitation = pgTable("invitation", { 
  id: serial("id").primaryKey(),
  status : invitationValues("status").notNull().default("pended"),
  senderId: integer("senderId").notNull().references(() => user.id, { onDelete: 'cascade' }),
  receiverId: integer("receiverId").notNull().references(() => animal.ownerId, { onDelete: 'cascade' }),
  animalId: integer("animalId").notNull().references(() => animal.id, { onDelete: 'cascade' }),
  date: date("date").notNull().default('now()'),
});
