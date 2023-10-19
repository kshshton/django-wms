import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const createUser = await prisma.user.create({
        data: {
            name: "Mariusz",
            password: "haslo123",
            email: "pudzian@gmail.com"
        }
    })
    console.log(createUser);
}

main()
    .catch(_err => {
        console.log(_err);
    })
    .finally(async () => {
        await prisma.$disconnect();
    })