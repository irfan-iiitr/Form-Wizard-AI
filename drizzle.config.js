import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";
dotenv.config();
 
export default defineConfig({
  schema: "./configs/schema.js",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DRIZZLE_DATABASE_URL_CONFIG,
  }
});
