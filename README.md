## Getting Started

Add the following environment variables:

* NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
* CLERK_SECRET_KEY
* NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
* NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

* DATABASE_URL

* NEXT_PUBLIC_S3_ACCESS_KEY_ID
* NEXT_PUBLIC_S3_SECRET_ACCESS_KEY
* NEXT_PUBLIC_S3_BUCKET_NAME

* PINECONE_API_KEY
* OPENAI_API_KEY

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.