import { PrismaClient } from '@prisma/client';

import prisma from '@wishlist-lib/prisma';

export type Context = {
  prisma: PrismaClient;
};

export async function createContext({ req, res }): Promise<Context> {
  return {
    prisma,
  };
}
