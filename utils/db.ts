import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Check if prisma is in "this" global space, and if it's not, make it and assign it to a variable called prisma. 
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({});

if (process.env.NODE_ENV !== 'production') globalForPrisma;
