'use client';

import { useRef, useState } from 'react';

interface ImageUploadInputProps {
  inputId: string;
  previewId: string;
  disabled?: boolean;
}

export default function ImageUploadInput({ inputId, previewId, disabled }: ImageUploadInputProps) {
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewSrc(URL.createObjectURL(file));
    } else {
      setPreviewSrc(null);
    }
  }

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <input
        id={inputId}
        ref={inputRef}
        name="imageFile"
        type="file"
        accept="image/*"
        disabled={disabled}
        className="text-sm text-gray-700 dark:text-white/80 file:mr-3 file:h-9 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-900 file:text-white hover:file:bg-gray-950 file:cursor-pointer disabled:opacity-60"
        onChange={handleChange}
      />
      {previewSrc && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          id={previewId}
          src={previewSrc}
          alt="preview"
          className="h-16 w-24 object-cover rounded-lg ring-1 ring-black/10 dark:ring-white/10"
        />
      )}
    </div>
  );
}
