import { PrismaClient } from "@prisma/client";
import sampleData from "./sample-data";

async function main() {
  const prisma = new PrismaClient();
  // delete all the data in product table
  await prisma.product.deleteMany();
  // create a product table with the data
  await prisma.product.createMany({
    data: sampleData.products,
  });

  console.log("Database seeded successfully!")
}

main();
