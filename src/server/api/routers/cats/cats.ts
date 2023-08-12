import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { cats } from "./mock";

export const catsRouter = createTRPCRouter({
  all: publicProcedure.query(({}) => {
    return cats;
  }),
});
