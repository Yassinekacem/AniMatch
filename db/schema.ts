import { integer, bigint,varchar, boolean, pgTable, text, pgEnum, serial , date, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";


export const SpeciesValues = pgEnum("speciesValues", ["Dog", "Cat"]);
export const invitationValues = pgEnum("invitationValues", ["pended", "accepted", "rejected"]); 

export const animals = pgTable("animals", {
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
  ownerId: integer("ownerId").notNull().references(() => users.id, { onDelete: 'cascade' }), // Add foreign key reference with cascade
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  clerkId : text("clerkId").notNull(), 
  firstName : text("firstName").notNull() , 
  lastName : text("lastName").notNull() ,
  photo : text("photo").notNull(),
  email: text("email").notNull(), 
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),


}) 



export const wishs = pgTable("wishs", { 
  id : serial("id").primaryKey(),
  userId  : integer("userId").notNull().references(() => users.id, { onDelete: 'cascade' }), 
  animalId  :  integer("animalId").notNull().references(() => animals.id, { onDelete: 'cascade' }), 
})


export const invitations = pgTable("invitations", { 
  id: serial("id").primaryKey(),
  status : invitationValues("status").notNull().default("pended"),
  senderId: integer("senderId").notNull().references(() => users.id, { onDelete: 'cascade' }),
  receiverId: integer("receiverId").notNull().references(() => animals.ownerId, { onDelete: 'cascade' }),
  animalId: integer("animalId").notNull().references(() => animals.id, { onDelete: 'cascade' }),
  date: date("date").notNull().default('now()'),
});


export const todosRelations = relations ( animals , ({one}) => ({ 
  user : one(users , {fields : [animals.ownerId] , references : [users.id]} )
})  ) 


export const userRelations = relations ( users , ({many}) => ({ 
  animals : many(animals)
})  )