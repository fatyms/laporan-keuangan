import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

export const supabase = createClient(
  "https://nrhbxuiztmafwhwhfkmz.supabase.co",   // Project URL
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yaGJ4dWl6dG1hZndod2hma216Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxODIzMzksImV4cCI6MjA4Mzc1ODMzOX0.KLz-DGdXVx2r0r02lAeYy1EL62TRwrWwalqy76l93vU"             // anon key
);
