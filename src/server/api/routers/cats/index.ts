import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";
import { CreateCatInput, GetCatInput, UpdateCatInput } from "./zod";
import { seededCatStatusIds } from "~/constants";

export const catsRouter = createTRPCRouter({
    all: publicProcedure.query(async () => await prisma.cat.findMany()),
    one: publicProcedure.input(GetCatInput).query(
        async ({ input }) =>
            await prisma.cat.findUnique({
                where: {
                    id: input.id,
                },
            })
    ),
    create: publicProcedure.input(CreateCatInput).mutation(
        async ({ input }) =>
            await prisma.cat.create({
                data: {
                    ...input,
                    adoptionStatus: {
                        connect: {
                            id: seededCatStatusIds.isAdoptable.id,
                        },
                    },
                },
            })
    ),
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
