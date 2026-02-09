import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ppqftlznbllffrhdmmja.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwcWZ0bHpuYmxsZmZyaGRtbWphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0Mjc0NDUsImV4cCI6MjA4MDAwMzQ0NX0.Xa9FIfpSogTDTGui-SN4n0hcBURbhxNYDDlQsMpwT_g";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
