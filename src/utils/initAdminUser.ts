import { supabase } from '@/integrations/supabase/client';

export const initAdminUser = async () => {
  const email = 'admin@example.com';
  const password = 'Justme22@@';
  
  try {
    // Check if user already exists
    const { data: existingUsers, error: fetchError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email);
    
    if (fetchError) {
      console.error('Error checking existing user:', fetchError);
      return;
    }
    
    // If user doesn't exist, create it
    if (!existingUsers || existingUsers.length === 0) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) {
        console.error('Error creating admin user:', error);
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