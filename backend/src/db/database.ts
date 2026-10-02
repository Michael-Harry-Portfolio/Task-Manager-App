import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
console.log(
  "DATABASE_PASSWORD loaded:",
  typeof process.env.DATABASE_PASSWORD,
  process.env.DATABASE_PASSWORD ? "YES" : "NO"
);


const { Pool } = pg;

export const pool = new Pool({
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USER,
    password: String(process.env.DATABASE_PASSWORD),
    database: process.env.DATABASE_NAME,
});
   export async function testDatabaseConnection() {
  const client = await pool.connect();

  try {
    await client.query("SELECT NOW()");
    console.log("PostgreSQL connected successfully");
  } finally {7
    client.release();
  }
}