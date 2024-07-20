"use client"
import Link from "next/link";
import {useAuth} from "@clerk/nextjs"
import FileUpload from "./components/FileUpload";

export default function Home() {
  const { isSignedIn, userId } = useAuth();
  return (
    <main className="flex min-h-screen flex-col items-center">
      <section className="w-full min-h-screen bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] py-[10vh] ">
      <div className="container mx-auto flex flex-col items-center gap-6 px-4 text-center md:px-6">
        <h1 className="text-3xl font-bold tracking-tighter text-primary-foreground sm:text-4xl md:text-5xl lg:text-6xl">
          PDF Chat
        </h1>
        <p className="max-w-[600px] text-primary-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Chat with PDFs and get answers or summaries using generative AI.
        </p>
        {(!isSignedIn || !userId)?<Link
          href="/sign-in"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground px-8 text-sm font-medium text-primary shadow transition-colors hover:bg-primary-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          prefetch={false}
        >
          Login to get started
        </Link>:<Link
          href="/dashboard"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground px-8 text-sm font-medium text-primary shadow transition-colors hover:bg-primary-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          prefetch={false}
        >
          Go to Chat
        </Link>}
        <FileUpload/>
      </div>
    </section>
    </main>
  );
}
