import { supabase } from '@/lib/supabase';

export default async function Page() {
  const { data: games } = await supabase
    .from('games')
    .select('*');

  return (
    <div>
      <h1>Statistika</h1>
      <pre>{JSON.stringify(games, null, 2)}</pre>
    </div>
  );
}
