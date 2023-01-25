import { useEffect, useState } from "react";
import type { FC } from "react";
import { RouterOutputs } from "../utils/api";
import { Query, useQueryClient } from "@tanstack/react-query";

import { api } from "../utils/api";

type PostList = RouterOutputs["post"]["getFeed"];
export const Like: FC<{ hasLiked: boolean; count: number; postId: string }> = ({
  count,
  postId,
  hasLiked,
}) => {
  const [active, setActive] = useState(false);
  const likeMutation = api.post.likePost.useMutation();
  const dislikeMutation = api.post.dislikePost.useMutation();
  // const queryClient = useQueryClient();

  useEffect(() => {
    setActive(hasLiked);
  }, [hasLiked]);

  const updateCountCache = (oldData: PostList) =>
    oldData.map((post) => {
      if (post.id === postId) {
        return { ...post, likes: post.likeCount - 1 };
      }
      return post;
    });

  const handleLike = () => {
    if (active) {
      dislikeMutation.mutate({ postId });
    } else {
      likeMutation.mutate({ postId });
    }
    setActive(!active);
  };

  return (
    <div onClick={handleLike} className="flex cursor-pointer">
      <LikeIcon active={active} />
      <span className="ml-1 text-sm text-gray-400 ">{count}</span>
    </div>
  );
};

const LikeIcon = ({ active }: { active: boolean }) => (
  <div>
    <svg
      className="h-5 w-5 text-gray-400"
      fill={active ? "red" : "none"}
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={active ? 0.5 : 2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  </div>
);
