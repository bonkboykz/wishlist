import { enumType, objectType, extendType } from 'nexus';

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
