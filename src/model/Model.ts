type Player = {
    id: string;
    name: string,
    singleWins: number | null,
    singleLoses: number | null,
    doubleWins: number | null,
    doubleLoses: number | null,
    totalWins: number | null,
    totalLoses: number | null
};

type Game = { id: string; created_at: string, type: string, winner: string[], loser: string[] };
