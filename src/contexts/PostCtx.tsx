import { createContext } from "react";

export interface IPostIdContext {
  postId: string;
}

const PostIdContext = createContext<IPostIdContext>({ postId: "" });

export default PostIdContext;
