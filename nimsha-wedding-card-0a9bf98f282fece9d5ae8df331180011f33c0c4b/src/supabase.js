// src/supabase.js
import { createClient } from '@supabase/supabase-js';

// Vite වලදී env variables ගන්නේ import.meta.env මගින්
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);