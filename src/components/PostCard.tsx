import { useEffect, useRef, useState } from "react";
import type { FC } from "react";
import { CldImage } from "next-cloudinary";

import type { RouterOutputs } from "../utils/api";
import { api } from "../utils/api";
import { CardTop } from "./CardTop";
import { Like } from "./Like";
import { CommentBtn } from "./CommentButton";
import { imgOptions } from "../utils/types";

// import { useScreenSize } from "../hooks/useScreenSize";

export type PostInfo = RouterOutputs["post"]["getFeed"][number];

export const PostCard: FC<{ post: PostInfo }> = ({ post }) => {
  const ref = useRef<HTMLDivElement>(null);

  const { refetch, data } = api.post.hasUserLikedPost.useQuery(
    { postId: post.id },
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );
  const [hasUserLiked, setHasUserLiked] = useState(false);

  useEffect(() => {
    let obsValue: HTMLDivElement | null = null;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // console.info(post.body, "is in view");
          refetch()
            .then((res) => {
              setHasUserLiked(res.data as boolean);
            })
            .catch((e) => console.error(e));
          observer.unobserve(entry.target);
          // console.log("now disconnected");
        }
      });
    });
    if (ref.current) {
      observer.observe(ref.current);
      obsValue = ref.current;
    }
    return () => {
      if (obsValue) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className=" card-compact card m-4  w-80  bg-[#313245]  shadow-xl md:w-[30rem]"
    >
      <CardTop createdAt={post.createdAt} {...post.author} />
      <figure className="border-green w-full">
        <CldImage className="w-full" {...imgOptions} src={post.imgUrl} />
      </figure>
      <div className="flex justify-between py-1 px-2">
        <Like
          hasLiked={hasUserLiked ? true : false}
          postId={post.id}
          count={post.likeCount}
        />
        <CommentBtn />
      </div>
      <div className="card-body !py-1">
        <h3 className="card-title text-lg">{post.body}!</h3>
      </div>
    </div>
  );
};

// https://placeimg.com/400/225/arch
