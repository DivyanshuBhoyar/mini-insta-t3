import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const commentRouter = createTRPCRouter({
  createOne: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
        body: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const newComment = await ctx.prisma.comment.create({
        data: {
          postId: input.postId,
          authorId: ctx.session.user.id,
          body: input.body,
        },
        select: {
          id: true,
          body: true,
          createdAt: true,
        },
      });
      return newComment;
    }),

  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.comment.delete({
        where: {
          id: input.id,
        },
      });
      return {
        success: true,
      };
    }),

  getByPost: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.comment.findMany({
        where: {
          postId: input.postId,
        },
        select: {
          body: true,
          createdAt: true,
          id: true,
          user: {
            select: {
              image: true,
              name: true,
            },
          },
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
