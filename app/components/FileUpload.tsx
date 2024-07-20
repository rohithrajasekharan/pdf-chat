"use client"

import { UploadToS3 } from "@/lib/s3";
import { useState } from "react"
import { useDropzone } from "react-dropzone"

type File = {
    name: string;
    size: number;
  };

type IconProps = {
    className?: string;
}

export default function FileUpload() {

  const [files, setFiles] = useState<File[]>([])

  const { getInputProps, getRootProps } = useDropzone({
    accept: {"application/pdf": [".pdf"]},
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
        console.log(acceptedFiles)
        const file = acceptedFiles[0]
        if (file.size > 10 * 1024 * 1024) {
            alert('please upload a smaller file')
            return
        }
        try {
            const data = await UploadToS3(file)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
  })

  return (
    <div className="flex flex-col items-center justify-center h-50 rounded-md bg-primary-foreground p-8">
      <div className="max-w-md w-full px-4 space-y-4">
        <h1 className="text-xl font-bold tracking-tighter text-primary">Upload Files</h1>
        
        <div {...getRootProps({
                className: "flex flex-col items-center justify-center h-48 border-2 border-dashed border-primary rounded-lg cursor-pointer transition-colors hover:border-secondary-foreground"
})}><p className="text-muted-foreground">
          Drag and drop your files or click to select from your computer.
        </p>
            <input {...getInputProps()} />
        </div>
        {files.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-lg font-medium text-primary-foreground">Uploaded Files</h2>
            <ul className="space-y-1">
              {files.map((file, index) => (
                <li key={index} className="flex items-center justify-between px-4 py-2 bg-muted rounded-md">
                  <div className="text-muted-foreground truncate">{file.name}</div>
                  <div className="text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

function UploadIcon(props:IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}


function XIcon(props:IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}