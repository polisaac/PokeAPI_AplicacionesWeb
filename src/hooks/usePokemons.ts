import { useState, useEffect } from 'react';
import { getPokemonList, getTypes, getPokemonsByType } from '../services/pokemonService';
import type { PokemonListItem } from '../types/pokemon';

export const usePokemons = () => {
  // Estados de Datos
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [types, setTypes] = useState<{ name: string; url: string }[]>([]);
  
  // Estados de Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  
  // Estados UX
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Persistencia de Favoritos
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('poke-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // 1. Carga Inicial
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [pokeData, typesData] = await Promise.all([getPokemonList(), getTypes()]);
        setPokemons(pokeData);
        setTypes(typesData);
        setError('');
      } catch (err) {
        setError('Error al conectar con el laboratorio Pokémon.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // 2. Filtrado por Tipo en API
  useEffect(() => {
    if (!selectedType) return;
    
    const loadFiltered = async () => {
      try {
        setLoading(true);
        const typeUrl = types.find(t => t.name === selectedType)?.url;
        if (typeUrl) {
          const filtered = await getPokemonsByType(typeUrl);
          setPokemons(filtered);
        }
      } catch (err) {
        setError('No se pudieron filtrar los Pokémon.');
      } finally {
        setLoading(false);
      }
    };
    loadFiltered();
  }, [selectedType, types]);

  // 3. Sincronizar Favoritos con LocalStorage
  useEffect(() => {
    localStorage.setItem('poke-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (name: string) => {
    setFavorites(prev => 
      prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name]
    );
  };

  const clearFilters = async () => {
    setSearchTerm('');
    setSelectedType('');
    setLoading(true);
    const data = await getPokemonList();
    setPokemons(data);
    setLoading(false);
  };

  // Filtrado local por nombre (en tiempo real)
  const displayedPokemons = pokemons.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Exponemos solo lo que los componentes necesitan usar
  return {
    displayedPokemons,
    types,
    searchTerm,
    setSearchTerm,
    selectedType,
    setSelectedType,
    favorites,
    toggleFavorite,
    loading,
    error,
    clearFilters
  };
};