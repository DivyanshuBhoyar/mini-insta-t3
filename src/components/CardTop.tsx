import Image from "next/image";
import React from "react";
import type { PostInfo } from "./PostCard";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "short",
  timeStyle: "short",
});

export const CardTop: React.FC<
  PostInfo["author"] & { createdAt: PostInfo["createdAt"] }
> = ({ name, image, createdAt }) => {
  return (
    <div className="flex w-full items-center justify-between px-4  py-2">
      <div>
        <h5 className="font-bold opacity-90">{name}</h5>
        <p className="text-sm opacity-75 ">{dateFormatter.format(createdAt)}</p>
      </div>
      <div className="avatar">
        <Image
          src={image as string}
          width={48}
          height={48}
          className="w-12 rounded-full border-[0.2px]   border-emerald-100"
          alt="profile"
        />
        {/* // <img src={image} alt="profile-image" /> */}
      </div>
    </div>
  );
};
