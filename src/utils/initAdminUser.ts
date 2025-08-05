import { supabase } from '@/integrations/supabase/client';

export const initAdminUser = async () => {
  const email = 'admin';
  const password = 'Justme22@@';
  
  try {
    // Check if user already exists
    const { data: existingUsers, error: fetchError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email);
    
    if (fetchError) {
      // This might fail if the users table doesn't exist or we don't have access
      console.log('Could not check existing users, proceeding to create admin user');
    }
    
    // If user doesn't exist, create it
    if (!existingUsers || existingUsers.length === 0) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) {
        // Check if user already exists
        if (error.message.includes('already registered')) {
          console.log('Admin user already exists');
        } else {
          console.error('Error creating admin user:', error);
        }
      } else {
        console.log('Admin user created successfully:', data);
      }
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Error initializing admin user:', error);
  }
};