import { catsRouter } from "~/server/api/routers/cats";
import { createTRPCRouter } from "~/server/api/trpc";
import { usersRouter } from "./routers/users";
import { ordersRouter } from "./routers/order";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    cats: catsRouter,
    users: usersRouter,
    orders: ordersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
