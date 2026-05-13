export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokeAPIResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}