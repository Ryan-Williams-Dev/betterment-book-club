import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";
import { neon } from "@neondatabase/serverless";

const runMigration = async () => {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);

  console.log("⏳ Running migrations...");

  const start = Date.now();
  await migrate(db, { migrationsFolder: "src/db/migrations" });
  const end = Date.now();

  console.log(`✅ Migrations completed in ${end - start}ms`);

  process.exit(0);
};

runMigration().catch((err) => {
  console.error("❌ Migration failed");
  console.error(err);
  process.exit(1);
});
