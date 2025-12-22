'use client';

export default function Admin() {
  const submit = async () => {
    await fetch('/api/games', {
      method: 'POST',
      body: JSON.stringify({
        played_at: new Date(),
        team_a: ['uuid1'],
        team_b: ['uuid2'],
        winner: 'A'
      })
    });
  };

  return <button onClick={submit}>Unesi meč</button>;
}
