import { PrismaClient } from '@prisma/client';
import { Claims, getSession } from '@auth0/nextjs-auth0';

import prisma from '@wishlist-lib/prisma';

export type Context = {
  user: Claims;
  accessToken: string;

  prisma: PrismaClient;
};

export async function createContext({ req, res }): Promise<Context> {
  const userSession = getSession(req, res);

  return {
    user: userSession?.user,
    accessToken: userSession?.accessToken,
    prisma,
  };
}
