-- Add email column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS email TEXT;

-- Add unique constraint to ensure email uniqueness
ALTER TABLE profiles ADD CONSTRAINT profiles_email_key UNIQUE (email); 