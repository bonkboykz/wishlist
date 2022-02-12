import { enumType, objectType, extendType, stringArg } from 'nexus';

import { Link } from './Link';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id');
    t.string('name');
    t.string('email');
    t.string('image');
    t.field('role', { type: Role });
    t.list.field('favorites', {
      type: Link,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.user
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .favorites();
      },
    });
  },
});

const Role = enumType({
  name: 'Role',
  members: ['USER', 'ADMIN'],
});

export const UserFavorites = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('favorites', {
      type: 'Link',
      async resolve(_, _args, ctx) {
        let user = await ctx.prisma.user.findUnique({
          where: {
            email: ctx.user.email,
          },
          include: {
            favorites: true,
          },
        });

        console.log(ctx.user);

        if (!user) {
          // If user is not in our db -> create new
          user = await ctx.prisma.user.create({
            data: {
              id: ctx.user.sub,
              email: ctx.user.email,
              image: ctx.user.picture,
            },
            include: {
              favorites: true,
            },
          });
        }

        return user.favorites;
      },
    });
  },
});

export const BookmarkLink = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('bookmarkLink', {
      type: 'Link',
      args: {
        id: stringArg(),
      },
      async resolve(_, args, ctx) {
        const link = await ctx.prisma.link.findUnique({
          where: { id: args.id },
        });

        const user = await ctx.prisma.user.findUnique({
          where: {
            email: ctx.user.email,
          },
          include: {
            favorites: true,
          },
        });

        if (!user) {
          // If user is not in our db -> create new
          await ctx.prisma.user.create({
            data: {
              email: ctx.user.email,
              image: ctx.user.picture,
            },
            include: {
              favorites: true,
            },
          });
        }

        const isAlreadyBookmarked = user.favorites.find(
          (link) => link.id === args.id,
        );

        if (isAlreadyBookmarked) {
          await ctx.prisma.user.update({
            where: {
              email: ctx.user.email,
            },
            data: {
              favorites: {
                disconnect: {
                  id: link.id,
                },
              },
            },
          });

          return link;
        }

        await ctx.prisma.user.update({
          where: {
            email: ctx.user.email,
          },
          data: {
            favorites: {
              connect: {
                id: link.id,
              },
            },
          },
        });

        return link;
      },
    });
  },
});
