const { PrismaClient } = require("@prisma/client");
import { faker } from "@faker-js/faker";
//
const prisma = new PrismaClient();
//

async function run() {
  //
  const savedUser = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
    },
  });
  console.log("saved user: ", savedUser);
  //
  const users = await prisma.user.findMany();
  console.log(users);
  //
  const article = await prisma.article.create({
    data: {
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraph(),
      author: {
        connect: {
          id: savedUser.id,
        },
      },
    },
  });
  //
  console.log(article);
  //
  const articles = await prisma.article.findMany();
  console.log(articles);
  //
}

run()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
