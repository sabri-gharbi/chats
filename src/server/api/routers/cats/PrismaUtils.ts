import { type Prisma } from "@prisma/client";

export type PrismaCat = Prisma.CatGetPayload<{
    select: {
        id: true;
        name: true;
        birthDate: true;
        breed: true;
        gender: true;
        city: true;
        description: true;
        photo: true;
        adoptionStatus: true;
    };
}>;
