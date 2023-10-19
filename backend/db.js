import {PrismaClient} from '@prisma/client'
import bcrypt from "bcrypt";

const prisma = new PrismaClient()

async function main() {
    const password = "123test#";
    const properPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            name: "Yaro",
            password: properPassword,
            email: "kaczinsky@gmail.com"
        }
    });
    // const _delete  = await prisma.user.deleteMany();
    console.log(user);
}

main()
    .catch(_err => {
        console.log(_err);
    })
    .finally(async () => {
        await prisma.$disconnect();
    })