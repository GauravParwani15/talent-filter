
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ozzhdydwihmtfdkpaski.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96emhkeWR3aWhtdGZka3Bhc2tpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE1MjM5MzMsImV4cCI6MjA1NzA5OTkzM30.Zd0-tzNqjfdvWGuqOCaDVOrjzKOoEjlqqzvg1oSAYXU';

export const supabase = createClient(supabaseUrl, supabaseKey);
