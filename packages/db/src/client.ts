import { PrismaClient } from "@prisma/client";

// export const prisma = global.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") global.prisma = prisma;

// export * from "@prisma/client";

const createPrismaClient = () => {
  // const connectionString = env.DATABASE_URL;
  // const pool = new Pool({ connectionString });
  // const adapter = new PrismaPg(pool);
  return new PrismaClient({
    // adapter,
    // log:
    //   process.env.NODE_ENV === "development"
    //     ? ["query", "error", "warn"]
    //     : ["error"],
  });
};

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

export * from "@prisma/client";
