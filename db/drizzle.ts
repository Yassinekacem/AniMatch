import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon("postgresql://neondb_owner:rV0YhCgv4Zku@ep-round-cell-a20f2ugh.eu-central-1.aws.neon.tech/neondb?sslmode=require");

const db = drizzle(sql);

export default db;
