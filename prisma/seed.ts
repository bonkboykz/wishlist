import { PrismaClient } from '@prisma/client';

import { links } from './data/links';

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.create({
    data: {
      email: `admin@test.com`,
      role: 'ADMIN',
    },
  });

  await prisma.link.createMany({
    data: links.map((link) => ({
      ...link,
      authorId: admin.id,
    })),
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
