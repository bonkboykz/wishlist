import { intArg, objectType, queryType } from 'nexus';

export const Link = objectType({
  name: 'Link',
  definition(t) {
    t.string('id');
    t.int('index');
    t.int('userId');
    t.string('title');
    t.string('url');
    t.string('description');
    t.string('imageUrl');
    t.string('category');
  },
});

export const LinksQuery = queryType({
  definition(t) {
    t.list.field('links', {
      type: 'Link',
      args: {
        offset: intArg(),
        limit: intArg(),
      },
      async resolve(_, args, ctx) {
        const links = await ctx.prisma.link.findMany({
          take: args.offset + 3,
          skip: args.offset,
          orderBy: {
            index: 'asc',
          },
        });

        return links;
      },
    });
  },
});
