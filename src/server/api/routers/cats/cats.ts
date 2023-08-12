import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { cats } from "./mock";
import { prisma } from "~/server/db";

export const catsRouter = createTRPCRouter({
    all: publicProcedure.query(({}) => {
        return prisma.cat.findMany();
    }),

    create: publicProcedure.mutation(async () => {
        await prisma.cat.create({
            data: {
                name: "Minou",
                birthDate: new Date(2019, 5, 15),
                breed: "Siamese",
                gender: "Male",
                city: "Paris",
                description: "Minou is a playful and affectionate cat.",
                photo: "https://api-ninjas.com/images/cats/abyssinian.jpg",
                adoptionStatus: "Available",
            },
        });
    }),
});
