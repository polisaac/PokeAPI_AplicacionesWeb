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

export interface PokemonDetail {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: { 'official-artwork': { front_default: string } };
  };
  types: { type: { name: string } }[];
  weight: number;
  height: number;
  abilities: { ability: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
}