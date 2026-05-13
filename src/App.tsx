import { useEffect, useState } from 'react';
import { getPokemonList } from './services/pokemonService';
import type { PokemonListItem } from './types/pokemon';

function App() {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const data = await getPokemonList();
      setPokemons(data);
    };
    fetchPokemons();
  }, []);

  const getPokemonId = (url: string) => {
    const parts = url.split('/');
    return parts[parts.length - 2]; 
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#ef5350' }}>Mi PokeAPI</h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', 
        gap: '20px',
        marginTop: '30px'
      }}>
        
        {pokemons.map((pokemon) => {
          const id = getPokemonId(pokemon.url);
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

          return (
            <div 
              key={pokemon.name} 
              style={{ 
                border: '1px solid #e0e0e0', 
                borderRadius: '12px', 
                padding: '20px', 
                textAlign: 'center',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            >
              <img 
                src={imageUrl} 
                alt={pokemon.name} 
                style={{ width: '120px', height: '120px' }} 
              />
              <h3 style={{ textTransform: 'capitalize', margin: '10px 0 5px 0' }}>
                {pokemon.name}
              </h3>
              <span style={{ color: '#888', fontWeight: 'bold' }}>
                #{id.padStart(3, '0')}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;