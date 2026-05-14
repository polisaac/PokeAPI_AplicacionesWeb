import axios from 'axios';
import type { PokeAPIResponse, PokemonDetail } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const getPokemonList = async (limit = 20) => {
  try {
    const response = await axios.get<PokeAPIResponse>(`${BASE_URL}/pokemon?limit=${limit}`);
    return response.data.results;
  } catch (error) {
    console.error("Error al obtener los Pokémon", error);
    return [];
  }
};


export const getPokemonDetail = async (idOrName: string) => {
  try {
    const response = await axios.get<PokemonDetail>(`${BASE_URL}/pokemon/${idOrName}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo detalle", error);
    throw error;
  }
};