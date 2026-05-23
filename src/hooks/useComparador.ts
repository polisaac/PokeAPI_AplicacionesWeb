// src/hooks/useComparador.ts
import { useState } from 'react';
import { getPokemonDetail } from '../services/pokemonService';
import type { PokemonDetail } from '../types/pokemon';

export const useComparador = () => {
  const [pokemon1, setPokemon1] = useState<PokemonDetail | null>(null);
  const [pokemon2, setPokemon2] = useState<PokemonDetail | null>(null);
  const [search1, setSearch1] = useState('');
  const [search2, setSearch2] = useState('');
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [error1, setError1] = useState('');
  const [error2, setError2] = useState('');

  const buscarPokemon = async (slot: 1 | 2) => {
    const term = slot === 1 ? search1.trim().toLowerCase() : search2.trim().toLowerCase();
    if (!term) return;

    const setLoading = slot === 1 ? setLoading1 : setLoading2;
    const setError   = slot === 1 ? setError1   : setError2;
    const setPokemon = slot === 1 ? setPokemon1  : setPokemon2;

    try {
      setLoading(true);
      setError('');
      const data = await getPokemonDetail(term);
      setPokemon(data);
    } catch {
      setError(`No se encontró "${term}". Verifica el nombre o número.`);
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  };

  const getGanador = (statName: string): 1 | 2 | 'tie' | null => {
    if (!pokemon1 || !pokemon2) return null;
    const s1 = pokemon1.stats.find(s => s.stat.name === statName)?.base_stat ?? 0;
    const s2 = pokemon2.stats.find(s => s.stat.name === statName)?.base_stat ?? 0;
    if (s1 > s2) return 1;
    if (s2 > s1) return 2;
    return 'tie';
  };

  const totalStats = (pokemon: PokemonDetail) =>
    pokemon.stats.reduce((acc, s) => acc + s.base_stat, 0);

  const ganadorGeneral: 1 | 2 | 'tie' | null =
    pokemon1 && pokemon2
      ? totalStats(pokemon1) > totalStats(pokemon2) ? 1
      : totalStats(pokemon2) > totalStats(pokemon1) ? 2
      : 'tie'
    : null;

  return {
    pokemon1, pokemon2,
    search1, setSearch1,
    search2, setSearch2,
    loading1, loading2,
    error1, error2,
    buscarPokemon,
    getGanador,
    ganadorGeneral,
    totalStats,
  };
};