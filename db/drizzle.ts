import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon("postgresql://animatchDb_owner:TwFoQuAL9q8k@ep-young-darkness-a2g2m4gz.eu-central-1.aws.neon.tech/animatchDb?sslmode=require");

const db = drizzle(sql);

export default db;
