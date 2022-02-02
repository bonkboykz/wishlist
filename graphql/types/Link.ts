import { intArg, objectType, extendType, nonNull, stringArg } from 'nexus';

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

export const LinksQuery = extendType({
  type: 'Query',
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

export const CreateLink = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createLink', {
      type: 'Link',
      args: {
        title: nonNull(stringArg()),
        url: nonNull(stringArg()),
        imageUrl: nonNull(stringArg()),
        category: nonNull(stringArg()),
        description: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        const user = await ctx.prisma.user.findUnique({
          where: {
            email: ctx.user.email,
          },
        });

        // if (!user || user.role !== 'ADMIN') {
        //   throw new Error(`You do not have permission to perform action`);
        // }

        const newLink = {
          title: args.title,
          url: args.url,
          imageUrl: args.imageUrl,
          category: args.category,
          description: args.description,
        };

        return await ctx.prisma.link.create({
          data: newLink,
        });
      },
    });
  },
});
