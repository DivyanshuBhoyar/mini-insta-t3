import { useContext, useRef } from "react";
import type { FC } from "react";
import { api } from "../utils/api";
import PostIdContext from "../contexts/PostCtx";

export const CommentForm: FC = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { mutate, isLoading, isError } = api.comment.createOne.useMutation();
  const { postId } = useContext(PostIdContext);

  const handleSubmit = () => {
    if (inputRef.current)
      mutate({
        postId,
        body: inputRef.current.value,
      });
  };

  return (
    <div className="mt-4">
      <textarea
        ref={inputRef}
        className="textarea-primary textarea w-full"
        placeholder="Add a new comment"
      ></textarea>
      <div className="text-end">
        <button
          className={`ml- btn-primary btn-sm btn mt-2 ${
            isLoading ? "loading" : ""
          } `}
          onClick={handleSubmit}
        >
          Post
        </button>
        {isError && <span className="text-error">Failed</span>}
      </div>
    </div>
  );
};
