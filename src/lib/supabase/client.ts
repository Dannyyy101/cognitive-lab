import {createClient} from "@supabase/supabase-js";

export const supabase = createClient(
    "https://hwoergrnshbhumndrgue.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3b2VyZ3Juc2hiaHVtbmRyZ3VlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3NTY0NzgsImV4cCI6MjA1NjMzMjQ3OH0.aSO03DU4ZS1YVydodImusZd4iptV2dSjefLpqRrqv7k"
);