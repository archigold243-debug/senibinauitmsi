import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cmroqtewrcboynsojmzq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtcm9xdGV3cmNib3luc29qbXpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1MzcyMDUsImV4cCI6MjA1NTExMzIwNX0.EHqK9crrPsZVYS6uLcSXsj8JIureOzo_AmdXa1Gom4w';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 