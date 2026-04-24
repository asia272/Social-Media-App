"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { XIcon } from "lucide-react";

interface ImageUploadProps {
  onChange: (url: string) => void;
  value: string;
  endpoint: "postImage";
}

const ImageUpload = ({ endpoint, onChange, value }: ImageUploadProps) => {
  return (
    <div className="space-y-4">
      {/* Preview */}
      {value && (
        <div className="relative size-40">
          <img
            src={value}
            alt="Upload"
            className="rounded-md size-40 object-cover"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-0 right-0 p-1 bg-red-500 rounded-full"
          >
            <XIcon className="h-4 w-4 text-white" />
          </button>
        </div>
      )}

      {/* Upload */}
      <UploadDropzone
        key={value || "upload"} 
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          const url = res?.[0]?.url;
          if (url) onChange(url);
        }}
        onUploadError={(error: Error) => {
          console.error("Upload error:", error);
        }}
      />
    </div>
  );
};

export default ImageUpload;