import { PrismaClient } from "@/lib/generated/prisma";
import sampleData from "./sample-data";

const prisma = new PrismaClient();

async function main() {
  // delete all the data in product table
  await prisma.product.deleteMany();
  // create a product table with the data
  await prisma.product.createMany({
    data: sampleData.products,
  });
  console.log("Database seeded successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
