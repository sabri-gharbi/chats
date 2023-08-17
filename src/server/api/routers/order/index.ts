import { prisma } from "~/server/db";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { OrderInput } from "./zod";

export const ordersRouter = createTRPCRouter({
    all: publicProcedure.query(async () => await prisma.adoptionDemand.findMany()),
    one: publicProcedure.input(OrderInput).query(
        async ({ input }) =>
            await prisma.adoptionDemand.findUnique({
                where: {
                    catId_userId: {
                        catId: input.catId,
                        userId: input.userId,
                    },
                },
            })
    ),

    sendAdoptionRequest: publicProcedure.input(OrderInput).mutation(async ({ input }) => {
        const { catId, userId } = input;

        return await prisma.adoptionDemand.create({
            data: {
                catId: catId,
                userId: userId,
            },
        });
    }),
    cancelAdoptionRequest: publicProcedure.input(OrderInput).mutation(async ({ input }) => {
        const { catId, userId } = input;

        return await prisma.adoptionDemand.delete({
            where: {
                catId_userId: {
                    catId: catId,
                    userId: userId,
                },
            },
        });
    }),
});
