import { prisma } from "~/server/db";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { CreateUserInput, GetUserInput, UpdateUserInput } from "./zod";

export const usersRouter = createTRPCRouter({
    all: publicProcedure.query(async () => await prisma.user.findMany()),
    one: publicProcedure.input(GetUserInput).query(
        async ({ input }) =>
            await prisma.user.findUnique({
                where: {
                    id: input.id,
                },
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
