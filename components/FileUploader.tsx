'use client';

import { useCallback, Dispatch, SetStateAction } from 'react';
import type { FileWithPath } from '@uploadthing/react';
import { useDropzone } from '@uploadthing/react/hooks';
import { generateClientDropzoneAccept } from 'uploadthing/client';

import { Button } from '@/components/ui/button';
import { convertFileToUrl } from '@/lib/utils';

type FileUploaderProps = {
  onFieldChange: (urls: string[]) => void;
  imageUrls: string[];
  setFiles: Dispatch<SetStateAction<FileWithPath[]>>;
};

export function FileUploader({
  imageUrls = [],
  onFieldChange,
  setFiles
}: FileUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      // Combine new and existing files, limit to 4
      const currentFiles = acceptedFiles.slice(0, 4);

      // Update the state with the new combined list
      setFiles(currentFiles);
      

      // Convert new file list to URLs
      const urls = currentFiles.map(convertFileToUrl);
      onFieldChange(urls);
    },
    [onFieldChange, setFiles]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(['image/*']),
    multiple: true, // Allow multiple files
  });

  return (
    <div
      {...getRootProps()}
      className="flex-center bg-dark-3 flex h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50 w-[850px]">
      <input {...getInputProps()} className="cursor-pointer" />

      {imageUrls.length > 0 ? (
        <div className="flex flex-wrap gap-4 justify-center">
          {imageUrls.map((url, index) => (
            <div key={index} className="flex-none w-1/4 p-1">
              <img
                src={url}
                alt={`Uploaded image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center bg-white py-5 text-grey-500">
          <img src="/icons/upload.svg" width={77} height={77} alt="file upload" />
          <h3 className="mb-2 mt-2">Drag photos here</h3>
          <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
          <Button type="button" className="rounded-full">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
}
