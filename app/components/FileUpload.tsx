"use client"

import { UploadToS3 } from "@/lib/s3";
import { useDropzone } from "react-dropzone"
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import toast from "react-hot-toast";
import React from "react";

export default function FileUpload() {
    
    const [uploading, setUploading] = React.useState(false)

    const { mutate, isPending } = useMutation({
        mutationFn: async ({
          file_key,
          file_name,
        }: {
          file_key: string;
          file_name: string;
        }) => {
          const response = await axios.post("/api/create-chat", {
            file_key,
            file_name,
          });
          return response.data;
        },
      });

    const { getInputProps, getRootProps } = useDropzone({
        accept: { "application/pdf": [".pdf"] },
        maxFiles: 1,
        onDrop: async (acceptedFiles) => {
            console.log(acceptedFiles)
            const file = acceptedFiles[0]
            if (file.size > 10 * 1024 * 1024) {
                toast.error("file too large")
                return
            }
            try {
                setUploading(true)
                const data = await UploadToS3(file)
                if (!data?.file_key || !data.file_name) {
                    toast.error("something went wrong")
                    return;
                }
                mutate(data, {
                    onSuccess: (data) => {
                        console.log(data)
                    },
                    onError: (err) => {
                        toast.error("Error creating chat")
                    }
                }) 
                console.log(data)
            } catch (error) {
                toast.error("something went wrong")
            } finally {
                setUploading(false)
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
                    {(uploading || isPending)?
                     ( <div className="flex items-center justify-center">
                     <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                   </div>):
                    (<input {...getInputProps()} />)}
                </div>
            </div>
        </div>
    )
}