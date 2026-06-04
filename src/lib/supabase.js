import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hbumnovzjrwwmtkhyinh.supabase.co";

const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhidW1ub3Z6anJ3d210a2h5aW5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1NDY5MzQsImV4cCI6MjA5NjEyMjkzNH0.6YKzTGRQyL3r6z1IrsOh9JEj2msvwXyNC2GIDjIriu4";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);