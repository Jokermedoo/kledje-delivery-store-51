// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://evzthktuaomwsikuxfsl.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2enRoa3R1YW9td3Npa3V4ZnNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0OTAxMjEsImV4cCI6MjA2ODA2NjEyMX0.DtIcnzmP1LhTgwSB4HDTS4--AOYGi2ZvUEtTI6sx8hs";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});