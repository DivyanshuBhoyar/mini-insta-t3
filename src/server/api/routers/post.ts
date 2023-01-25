import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello from post router ${input.text}`,
      };
    }),

  getFeed: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      select: {
        id: true,
        body: true,
        createdAt: true,
        imgUrl: true,
        likeCount: true,
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  // createPost protected mutation
  createPost: protectedProcedure
    .input(z.object({ body: z.string(), imgUrl: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const newPost = await ctx.prisma.post.create({
        data: {
          body: input.body,
          imgUrl: input.imgUrl,
          author: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
      return newPost;
    }),

  likePost: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const like = await ctx.prisma.like.create({
        data: {
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          post: {
            connect: {
              id: input.postId,
            },
          },
        },
      });
      await ctx.prisma.post.update({
        where: {
          id: input.postId,
        },
        data: {
          likeCount: {
            increment: 1,
          },
        },
      });
      return like;
    }),

  //dislikePost
  dislikePost: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const like = await ctx.prisma.like.delete({
        where: {
          postId_userId: {
            postId: input.postId,
            userId: ctx.session.user.id,
          },
        },
      });
      await ctx.prisma.post.update({
        where: {
          id: input.postId,
        },
        data: {
          likeCount: {
            decrement: 1,
          },
        },
      });
      return like;
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  // hasUserLikedPost
  hasUserLikedPost: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ input, ctx }) => {
      const like = await ctx.prisma.like.findUnique({
        where: {
          postId_userId: {
            postId: input.postId,
            userId: ctx.session.user.id,
          },
        },
        select: {
          userId: true,
        },
      });
      return like ? true : false;
    }),

  // delete post
  deletePost: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.post.delete({
        where: {
          id: input.id,
        },
      });
      return { success: true };
    }),
});
