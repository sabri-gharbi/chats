import { type Prisma } from "@prisma/client";

export const CatSelect = {
    id: true,
    name: true,
    birthDate: true,
    breed: true,
    gender: true,
    city: true,
    description: true,
    photo: true,
    adoptionStatus: true,
    catLoversIds: true,
} satisfies Prisma.CatSelect;

export type PrismaCat = Prisma.CatGetPayload<{
    select: typeof CatSelect;
}>;
