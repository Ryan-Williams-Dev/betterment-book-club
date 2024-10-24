import { drizzle } from "drizzle-orm/neon-http";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined");
}
export const db = drizzle(databaseUrl);

// Optional: Run migrations on startup
// migrate(db, { migrationsFolder: "drizzle/migrations" });
