import { integer, bigint, varchar, boolean, pgTable, text, pgEnum, serial, date, timestamp } from "drizzle-orm/pg-core";
import { desc, relations } from "drizzle-orm";
import { createDecipheriv } from "crypto";

// Enum for species
export const SpeciesValues = pgEnum("speciesValues", ["Dog", "Cat"]);
// Enum for invitation
export const invitationValues = pgEnum("invitationValues", ["pended", "accepted", "rejected"]);
// Enum for city 
export const CityValues = pgEnum("cityValues", [
  "Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul", "Zaghouan", "Bizerte",
  "Beja", "Jendouba", "Kef", "Siliana", "Kairouan", "Sousse", "Mahdia",
  "Monastir", "Sfax", "Gabes", "Mednine", "Tozeur", "Gafsa", "Kasserine",
  "Sidi Bouzid", "Tataouine", "Gbelli"
]);
// Enum for breed
export const BreedValues = pgEnum("breedValues", ["Labrador", "Rottweiler", "Berger Allemand", "Berger noir",
  "Malinois", "Husky", "Caniche", "Chihuahuah", "Dobermann", "Pitbull", "Bichon", "Others", "Siamois", "Persan", "Bengal", "Scottish Fold", "Ragdoll", "sphynx", "snowshoe", "himalayan"
]);


export const animals = pgTable("animals", {
  id: serial("id").primaryKey(),
  breed: BreedValues("breed").notNull(),
  gender: varchar("gender").notNull(),
  species: SpeciesValues("species").notNull(),
  name: varchar("name").notNull(),
  city: CityValues("city").notNull(),
  age: integer("age").notNull(),
  vaccinated: boolean("vaccinated").notNull(),
  trained: boolean("trained").notNull(),
  friendly: boolean("friendly").notNull(),
  available: boolean("available").notNull().default(true),
  description: text("description").notNull(),
  image: varchar("image").array().notNull(),
  ownerId: integer("ownerId").notNull().references(() => users.id, { onDelete: 'cascade' }),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  clerkId: text("clerkId").notNull(),
  firstName: text("firstName").notNull(),
  lastName: text("lastName").notNull(),
  photo: text("photo").notNull(),
  email: text("email").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),


})



export const wishs = pgTable("wishs", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull().references(() => users.id, { onDelete: 'cascade' }),
  animalId: integer("animalId").notNull().references(() => animals.id, { onDelete: 'cascade' }),
})


export const invitations = pgTable("invitations", {
  id: serial("id").primaryKey(),
  status: invitationValues("status").notNull().default("pended"),
  senderId: integer("senderId").notNull().references(() => users.id, { onDelete: 'cascade' }),
  receiverId: integer("receiverId").notNull().references(() => animals.ownerId, { onDelete: 'cascade' }),
  animalId: integer("animalId").notNull().references(() => animals.id, { onDelete: 'cascade' }),
  date: date("date").notNull().default('now()'),
  senderPhoto: text("senderPhoto").notNull(),
  senderName: text("senderName").notNull(), 
  animalName : text("animalName").notNull(), 
  description : text("description").notNull(), 
  images : text("images").array().notNull(), 
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),  
});

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull().references(() => users.id, { onDelete: 'cascade' }),
  content: text("content").notNull(),
  rate: integer("rate").notNull(),
  userPhoto: text("userPhoto").notNull(),
  firstName: text("firstName").notNull(),
  lastName: text("lastName").notNull(),
  animalId: integer("animalId").notNull().references(() => animals.id, { onDelete: 'cascade' }),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
})


export const todosRelations = relations(animals, ({ one }) => ({
  user: one(users, { fields: [animals.ownerId], references: [users.id] })
}))


export const userRelations = relations(users, ({ many }) => ({
  animals: many(animals)
}))
