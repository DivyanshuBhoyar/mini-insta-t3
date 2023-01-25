import type { FC } from "react";
import { PostModal } from "./NewPostModal";

export const Navbar: FC = () => {
  return (
    <div className="navbar sticky top-0 z-10  bg-base-300  text-neutral-content">
      <a className="btn-ghost btn text-xl normal-case">Mini insta 🧑🏼‍💻</a>
      <a href="#new-post" className="btn-accent  btn-md btn ml-auto mr-2">
        new post
      </a>
      <div className="modal" id="new-post">
        <PostModal />
      </div>
    </div>
  );
};
