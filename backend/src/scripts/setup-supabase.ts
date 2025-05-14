import { supabase } from '../config/supabase';

async function setupSupabase() {
  try {
    console.log('Setting up Supabase tables and policies...');

    // Enable RLS on users table
    const { error: usersRlsError } = await supabase
      .from('users')
      .select('*')
      .limit(1)
      .then(() => {
        return supabase.rpc('exec_sql', {
          sql: `
            ALTER TABLE users ENABLE ROW LEVEL SECURITY;

            -- Allow users to view their own record
            CREATE POLICY "Users can view their own record"
              ON users FOR SELECT
              USING (auth.uid() = id);

            -- Allow users to insert their own record
            CREATE POLICY "Users can insert their own record"
              ON users FOR INSERT
              WITH CHECK (auth.uid() = id);

            -- Allow users to update their own record
            CREATE POLICY "Users can update their own record"
              ON users FOR UPDATE
              USING (auth.uid() = id);

            -- Allow service role to manage all records
            CREATE POLICY "Service role can manage all records"
              ON users
              USING (auth.role() = 'service_role')
              WITH CHECK (auth.role() = 'service_role');
          `
        });
      });

    if (usersRlsError) {
      console.error('Error setting up users RLS:', usersRlsError);
      throw usersRlsError;
    }

    // Enable RLS on profiles table
    const { error: profilesRlsError } = await supabase
      .from('profiles')
      .select('*')
      .limit(1)
      .then(() => {
        return supabase.rpc('exec_sql', {
          sql: `
            ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

            -- Allow users to view their own profile
            CREATE POLICY "Users can view their own profile"
              ON profiles FOR SELECT
              USING (auth.uid() = id);

            -- Allow users to insert their own profile
            CREATE POLICY "Users can insert their own profile"
              ON profiles FOR INSERT
              WITH CHECK (auth.uid() = id);

            -- Allow users to update their own profile
            CREATE POLICY "Users can update their own profile"
              ON profiles FOR UPDATE
              USING (auth.uid() = id);

            -- Allow service role to manage all profiles
            CREATE POLICY "Service role can manage all profiles"
              ON profiles
              USING (auth.role() = 'service_role')
              WITH CHECK (auth.role() = 'service_role');
          `
        });
      });

    if (profilesRlsError) {
      console.error('Error setting up profiles RLS:', profilesRlsError);
      throw profilesRlsError;
    }

    console.log('Supabase setup completed successfully!');
  } catch (error) {
    console.error('Supabase setup failed:', error);
    process.exit(1);
  }
}

setupSupabase(); 