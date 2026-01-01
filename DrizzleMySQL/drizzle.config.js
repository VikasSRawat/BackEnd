//! For Migration

import { defineConfig } from 'drizzle-kit';
export default defineConfig({
    // * Note : we created the drizzle folder
  out: './drizzle', //* The migration folder will be created in the drizzle folder
  schema: './drizzle/schema.js', //* The schema is present in schema.js file
  dialect: 'mysql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});