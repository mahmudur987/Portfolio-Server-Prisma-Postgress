import bcrypt from "bcrypt";
import dotenv from "dotenv";
import prisma from "./db";
dotenv.config();

async function main() {
  const adminEmail = "admin@gmail.com";
  const adminPass = "123456";
  const hashed = await bcrypt.hash(adminPass, 10);
  const existing = await prisma.user.findUnique({
    where: { email: adminEmail },
  });
  console.log("connectDB");
  if (!existing) {
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashed,
        name: "Portfolio Owner",
        role: "ADMIN",
        phone: "01671706882",
        picture: "https://i.pravatar.cc/150?img=1",
      },
    });
    console.log(`Seeded admin -> ${adminEmail} / ${adminPass}`);
  } else {
    console.log("Admin already exists, skipping seed.");
  }
}

function connectDB() {
  main();
  // .then(async () => {
  //   await prisma.$disconnect();
  // })
  // .catch(async (e) => {
  //   console.error(e);
  //   await prisma.$disconnect();
  //   process.exit(1);
  // });
}

export default connectDB;
