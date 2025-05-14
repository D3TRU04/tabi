-- First, disable RLS on both tables
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- Drop ALL existing policies from both tables
DROP POLICY IF EXISTS "Users can view their own record" ON users;
DROP POLICY IF EXISTS "Users can insert their own record" ON users;
DROP POLICY IF EXISTS "Users can update their own record" ON users;
DROP POLICY IF EXISTS "Service role can manage all records" ON users;
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Service role can manage all profiles" ON profiles;

-- Now enable RLS on both tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create new policies for users table
CREATE POLICY "Users can view their own record"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own record"
  ON users FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own record"
  ON users FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Service role can manage all records"
  ON users
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Create new policies for profiles table
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Service role can manage all profiles"
  ON profiles
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role'); 