import 'dotenv/config.js'
import { config } from 'dotenv'
import type { Config } from 'drizzle-kit'
import path from 'path'

// Load .env.local explicitly
config({ path: path.resolve(process.cwd(), '.env.local') })

export default {
  schema: './src/server/db/schema/index.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  tablesFilter: ['portfolio_*'],
} satisfies Config
