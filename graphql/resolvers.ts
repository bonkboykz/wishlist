import { Context } from './context';

export const resolvers = {
  Query: {
    links: (_parent, _args, context: Context) => {
      return context.prisma.link.findMany();
    },
  },
};
