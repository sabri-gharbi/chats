import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";
import { CreateCatInput, GetCatInput, UpdateCatInput } from "./zod";
import { seededCatStatusIds } from "~/constants";

export const catsRouter = createTRPCRouter({
    all: publicProcedure.query(
        async () =>
            await prisma.cat.findMany({
                select: {
                    id: true,
                    name: true,
                    birthDate: true,
                    breed: true,
                    gender: true,
                    city: true,
                    description: true,
                    photo: true,
                    adoptionStatus: true,
                },
            })
    ),
    one: publicProcedure.input(GetCatInput).query(
        async ({ input }) =>
            await prisma.cat.findUnique({
                where: {
                    id: input.id,
                },
            })
    ),
    create: publicProcedure.input(CreateCatInput).mutation(async ({ input }) => {
        console.log(input);

        const cat = await prisma.cat.create({
            data: {
                ...input,
                adoptionStatus: {
                    connectOrCreate: {
                        where: {
                            id: seededCatStatusIds.isAdoptable.id,
                        },
                        create: {
                            id: seededCatStatusIds.isAdoptable.id,
                            isAdoptable: true,
                            isAdopted: false,
                            isPending: false,
                        },
                    },
                },
            },
        });

        return cat;
    }),
    edit: publicProcedure.input(UpdateCatInput).mutation(async ({ input }) => {
        const { id, ...data } = input;
        return await prisma.cat.update({
            where: {
                id,
            },
            data: {
                ...data,
            },
        });
    }),
});
