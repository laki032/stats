'use client';

import { supabase } from '@/lib/supabase';

export default function Login() {
  const login = async () => {
    await supabase.auth.signInWithPassword({
      email: 'ti@admin.com',
      password: 'password'
    });
  };

  return <button onClick={login}>Login</button>;
}
