import { CldUploadButton } from "next-cloudinary";
import { useRef, useState } from "react";
import type { FC } from "react";

import type { Widget, UploadResult } from "../utils/types";
import { api } from "../utils/api";
import { uploadOptions } from "../utils/types";

export const PostModal: FC = () => {
  const [newInput, setNewInput] = useState({
    imgUrl: "",
    body: "",
  });
  const widgetRef = useRef<Widget | null>(null);

  const mutation = api.post.createPost.useMutation();

  const handleUploadProcess = (
    e: unknown,
    result: UploadResult,
    widget: Widget
  ) => {
    if (result.event === "success") {
      setNewInput((previous) => ({
        ...previous,
        imgUrl: result.info.public_id,
      }));
    } else alert(JSON.stringify(e));
    widgetRef.current = widget;
    widget.minimize();
  };

  const handleSubmit = (e) => {
    mutation.mutate(newInput);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    if (mutation.isSuccess && widgetRef.current) widgetRef.current.destroy();
  };

  return (
    <div className="modal-box  bg-neutral  py-4 ">
      <div className=" text-lg font-bold">Create a new post</div>
      <CldUploadButton
        className="btn-outline btn-secondary btn mt-3"
        onUpload={handleUploadProcess}
        uploadPreset="kefhyype"
        alt="upload"
        options={uploadOptions}
      >
        Add Photo
      </CldUploadButton>
      <textarea
        className="textarea-primary textarea my-3 w-full"
        value={newInput.body}
        onChange={(e) => setNewInput({ ...newInput, body: e.target.value })}
        placeholder="Caption"
      ></textarea>
      <div className="modal-action mt-0 p-0">
        <a href="#" className="btn-outline btn-warning btn">
          Close
        </a>
        <button
          onClick={handleSubmit}
          className={`btn-success btn ${mutation.isLoading ? "loading" : ""} `}
        >
          Post
        </button>
      </div>
    </div>
  );
};
