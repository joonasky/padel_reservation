import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

let prisma: PrismaClient;

const databaseUrl = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;

if (databaseUrl) {
  const pool = new Pool({ connectionString: databaseUrl });
  const adapter = new PrismaPg(pool);

  if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient({
      log: ["query"],
      adapter,
    });
  } else {
    let globalWithPrisma = global as typeof globalThis & {
      prisma: PrismaClient;
    };
    if (!globalWithPrisma.prisma) {
      globalWithPrisma.prisma = new PrismaClient({
        log: ["query"],
        adapter,
      });
    }
    prisma = globalWithPrisma.prisma;
  }
} else {
  throw new Error("Database URL not found in environment variables");
}

export default prisma;
