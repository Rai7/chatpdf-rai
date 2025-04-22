// drizzle.config.ts
import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  // where to write your SQL migration files
  out: "./drizzle/migrations",

  // your pgTable definitions
  schema: "./src/lib/db/schema.ts",

  // <— required! pick the SQL dialect you’re using
  dialect: "postgresql",

  // how to connect—use `url` for node-postgres-style
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },

  // (no `driver` here, unless you’re explicitly using pglite/D1/etc)
});
