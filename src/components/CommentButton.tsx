import { useContext } from "react";
import PostIdContext from "../contexts/PostCtx";
import { api } from "../utils/api";
import { CommentModal } from "./CommentModal";
import type { FC } from "react";

export const CommentBtn: FC = () => {
  const { postId } = useContext(PostIdContext);

  const { data: comments, refetch } = api.comment.getByPost.useQuery(
    { postId: postId },
    {
      enabled: false,
    }
  );

  const activateModal = () => {
    console.log("passing", postId);
    refetch()
      .then(() => {})
      .catch((e) => alert(e));
  };

  return (
    <div onClick={activateModal} className="flex cursor-pointer">
      <label
        htmlFor={`comments-modal-${postId}`}
        className="btn-ghost btn-sm btn"
      >
        <CommentIcon /> <span className="ml-1 text-sm">23</span>
      </label>
      <input
        type="checkbox"
        id={`comments-modal-${postId}`}
        className="modal-toggle "
      />
      {comments && <CommentModal comments={comments} />}
    </div>
  );
};

// static icon
const CommentIcon = () => {
  return (
    <div className="">
      <svg
        className="h-5 w-5 text-gray-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    </div>
  );
};
