import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import dotenv from 'dotenv';
dotenv.config();

import * as schema from './schema'

const sql = neon(process.env.NEXT_PUBLIC_DRIZZLE_DATABASE_URL_CONFIG);
export const db = drizzle(sql,{schema});

// const result = await db.select().from(...);
