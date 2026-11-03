//https://www.prisma.io/docs/guides/nuxt#4-update-the-application-code

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../prisma/generated/client";

import "dotenv/config";
const connectionString = process.env["DATABASE_URL"];
const prismaClientSingleton = () => {
  const adapter = new PrismaPg({ connectionString: connectionString! });
  return new PrismaClient({ adapter });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env["NODE_ENV"] !== "production") globalForPrisma.prisma = prisma;
