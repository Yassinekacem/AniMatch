import {asc, desc, eq} from "drizzle-orm";
import {db} from "@/db/drizzle";
import {users} from "@/db/schema"; 



export const getData = async () => {
  const data = await db.select().from(users).orderBy(asc(users.id));
  return data;
};

export const getById = async (id: number) => {
  const data = await db.select().from(users).where(eq(users.id, id));
  return data;
};

export const getUser = async (userId: any) => {
const user = await db.query.users.findMany(
  {
    where : (users , {eq}) => eq(users.clerkId , userId) , 
    with  : {
      animals: true,
    }
  }
)
return user

}

export const getAllUsers = async () => {
  const data = await db.select().from(users);
  return data;
};


export const addUser = async (user : any) => {
  await db.insert(users).values({ 
    clerkId : user?.clerkId,
    email : user?.email,
    name : user?.name!,  
    firstName : user?.firstName,  
    lastName : user?.lastName,
    photo : user?.photo
  })
  .returning({clerkClientId : users?.clerkId})
  // revalidatePath("/");
};