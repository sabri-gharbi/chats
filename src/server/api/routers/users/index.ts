import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";
import { UserSelect } from "./PrismaUtils";
import { CreateUserInput, GetUserInput, UpdateUserInput } from "./zod";

export const usersRouter = createTRPCRouter({
    all: publicProcedure.query(
        async () =>
            await prisma.user.findMany({
                select: UserSelect,
            })
    ),
    one: publicProcedure.input(GetUserInput).query(
        async ({ input }) =>
            await prisma.user.findUnique({
                where: {
                    id: input.id,
                },
                select: UserSelect,
            })
    ),
    create: publicProcedure.input(CreateUserInput).mutation(
        async ({ input }) =>
            await prisma.user.create({
                data: {
                    ...input,
                },
            })
    ),
    edit: publicProcedure.input(UpdateUserInput).mutation(async ({ input }) => {
        const { id, ...data } = input;
        return await prisma.user.update({
            where: {
                id,
            },
            data: {
                ...data,
            },
        });
    }),
});
