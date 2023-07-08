import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://cdkkhzqcqabybgpmgmch.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNka2toenFjcWFieWJncG1nbWNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg1NDM2MDAsImV4cCI6MjAwNDExOTYwMH0.5w0WszzEwuu0J2hnktgIQjQp4MrBi3DoTugYMxTV678'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
