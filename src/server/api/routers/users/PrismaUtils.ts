import { type Prisma } from "@prisma/client";

export const UserSelect = {
    id: true,
    name: true,
    email: true,
    role: true,
    adoptionDemands: true,
} satisfies Prisma.UserSelect;
