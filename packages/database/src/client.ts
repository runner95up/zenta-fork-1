import { PrismaClient } from "";
    "@prisma/client": "^5.12.1",

// export const prisma = global.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") global.prisma = prisma;

// export * from "
    "@prisma/client": "^5.12.1",

const env = process.env;

const createPrismaClient = () =>
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;

export * from "";
    "@prisma/client": "^5.12.1",
