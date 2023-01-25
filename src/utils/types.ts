export interface UploadResult {
  event: "success" | "error";
  info: {
    id: string;
    batchId: string;
    asset_id: string;
    public_id: string;
    width: number;
    height: number;
    format: string;
    type: string;
    etag: string;
    url: string;
    secure_url: string;
  };
}
export interface Widget {
  close(): void;
  destroy(): void;
  minimize(): void;
}

export const uploadOptions = {
  sources: ["local", "url", "camera", "google_drive"],
  multiple: false,
  theme: "minimal",
  maxFileSize: 12000000,
};

export const imgOptions = {
  height: 480,
  width: 480,
  alt: "post image",
  format: "webp",
};
