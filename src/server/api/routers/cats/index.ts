import { differenceInMonths } from "date-fns";
import { seededCatStatusIds } from "~/constants";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";
import { CatSelect, type PrismaCat } from "./PrismaUtils";
import { FavoritInput, CreateCatInput, DeleteCatInput, GetCatInput, UpdateCatInput } from "./zod";

export const catsRouter = createTRPCRouter({
    all: publicProcedure.query(async () => {
        const cats = await prisma.cat.findMany({
            select: CatSelect,
        });

        return cats.map(parsedCat);
    }),
    one: publicProcedure.input(GetCatInput).query(
        async ({ input }) =>
            await prisma.cat.findUnique({
                where: {
                    id: input.id,
                },
                select: CatSelect,
            })
    ),
    create: publicProcedure.input(CreateCatInput).mutation(async ({ input }) => {
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
    delete: publicProcedure.input(DeleteCatInput).mutation(
        async ({ input }) =>
            await prisma.cat.delete({
                where: {
                    id: input.id,
                },
            })
    ),
    addToFavoirt: publicProcedure.input(FavoritInput).mutation(async ({ input }) => {

        console.log("sabri")
        return await prisma.cat.update({
            where: {
                id: input.catId,
            },
            data: {
                catLovers: {
                    connect: {
                        id: input.userId,
                    },
                },
            },
        });
    }),
    removeFromFavoirt: publicProcedure.input(FavoritInput).mutation(async ({ input }) => {
        await prisma.cat.update({
            where: {
                id: input.catId,
            },
            data: {
                catLovers: {
                    disconnect: {
                        id: input.userId,
                    },
                },
            },
        });
    }),
});

type ParsedCat<T> = T & { age: string };
function parsedCat<T extends PrismaCat>(cat: T): ParsedCat<T> {
    let age = "";

    const today = new Date();
    const monthsNumber = differenceInMonths(today, cat.birthDate);

    if (!monthsNumber) {
        age = "less than 1 month";
    } else {
        age = `${Math.floor(monthsNumber / 12)} years, and ${monthsNumber % 12} months`;
    }

    return { ...cat, age };
}
