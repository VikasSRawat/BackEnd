//! For Migration

import { defineConfig } from 'drizzle-kit';
export default defineConfig({
    // * Note : we created the drizzle folder
  out: './drizzle/migration', //* The migration folder will store the sql commands and snapshots of the schemas
  schema: './drizzle/schema.js', //* The schema is present in schema.js file
  dialect: 'mysql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});