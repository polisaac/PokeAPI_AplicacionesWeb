import { useEffect, useState } from 'react';
import { getPokemonList } from '../services/pokemonService';
import type { PokemonListItem } from '../types/pokemon';
import { PokemonCard } from '../components/PokemonCard';

const Home = () => {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);

  useEffect(() => {
    getPokemonList().then(setPokemons);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Explora el Mundo Pokémon</h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', 
        gap: '20px' 
      }}>
        {pokemons.map((p) => (
          <PokemonCard key={p.name} name={p.name} url={p.url} />
        ))}
      </div>
    </div>
  );
};

export default Home;