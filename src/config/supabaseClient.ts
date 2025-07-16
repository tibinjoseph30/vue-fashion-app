import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lybberlsfkbcodfkimyv.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5YmJlcmxzZmtiY29kZmtpbXl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NTg0MTYsImV4cCI6MjA2ODIzNDQxNn0.aozeVJBuOMAKd3mvibu-_jQJDFEylikInUs0_fggTX4";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
