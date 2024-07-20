import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv"

dotenv.config({path: ".env.local"})

export default {
    dialect: "postgresql",
    schema: './lib/db/schema.ts',
    dbCredentials: {
        url: process.env.DATABASE_URL as string,
    },
} satisfies Config