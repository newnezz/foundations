import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://cymccahfqxuoirpkxlkh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5bWNjYWhmcXh1b2lycGt4bGtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQzODE4MDMsImV4cCI6MjA0OTk1NzgwM30.RG3mYI5xOVrktwft3-76Gwh88ak0iY-SMw8JMq1UH90";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
