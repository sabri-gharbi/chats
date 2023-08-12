import { catsRouter } from "~/server/api/routers/cats/cats";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  cats: catsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
