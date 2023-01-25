import type { FC } from "react";
import { useContext } from "react";
import { CommentForm } from "./CommentForm";
import type { RouterOutputs } from "../utils/api";
import PostIdContext from "../contexts/PostCtx";

type CommentsType = RouterOutputs["comment"]["getByPost"];

export const CommentModal: FC<{ comments: CommentsType }> = ({ comments }) => {
  const { postId } = useContext(PostIdContext);

  return (
    <div className="modal  backdrop-blur-md">
      <div className=" modal-box relative">
        <label
          htmlFor={`comments-modal-${postId}`}
          className="btn-sm btn-circle btn absolute right-2 top-2"
        >
          ✕
        </label>
        <h3 className="text-lg font-bold">Comments</h3>
        <CommentForm />
        {comments?.map((comment) => (
          <CommentView key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

const CommentView: FC<{ comment: CommentsType[number] }> = ({ comment }) => {
  return (
    <div className="mb-2 flex items-center pt-1 text-sm">
      <div className="avatar pr-2">
        <div className="w-6 rounded-full">
          <img src={comment.user.image} alt="Tailwind-CSS-Avatar-component" />
        </div>
      </div>
      <span className="mr-2 font-bold">{comment.user.name}</span> {comment.body}
    </div>
  );
};
