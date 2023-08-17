import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";
import { GetAllOrderInput, OrderInput } from "./zod";
import { seededCatStatusIds } from "~/constants";

export const ordersRouter = createTRPCRouter({
    all: publicProcedure.input(GetAllOrderInput).query(async ({ input }) => {
        return await prisma.adoptionDemand.findMany({
            where: input
                ? {
                      catId: input.catId,
                  }
                : undefined,
            include: {
                user: true,
            },
        });
    }),
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
    acceptRequest: publicProcedure.input(OrderInput.omit({ userId: true })).mutation(async ({ input }) => {
        await prisma.cat.update({
            where: {
                id: input.catId,
            },
            data: {
                adoptionStatus: {
                    connectOrCreate: {
                        where: {
                            id: seededCatStatusIds.isAdopted.id,
                        },
                        create: {
                            id: seededCatStatusIds.isAdopted.id,
                            isAdoptable: false,
                            isAdopted: true,
                            isPending: false,
                        },
                    },
                },
            },
        });

        await prisma.adoptionDemand.deleteMany({
            where: {
                catId: input.catId,
            },
        });
    }),
});
