import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPokemonDetail } from '../services/pokemonService';
import type { PokemonDetail } from '../types/pokemon';

const PokemonDetailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);

  useEffect(() => {
    if (id) getPokemonDetail(id).then(setPokemon);
  }, [id]);

  if (!pokemon) return <p>Cargando datos del Pokémon...</p>;

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <button onClick={() => navigate(-1)}>Volver</button>
      <h1>{pokemon.name.toUpperCase()}</h1>
      <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} style={{ width: '250px' }} />
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '20px' }}>
        <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
        <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
      </div>

      <h3>Tipos:</h3>
      {pokemon.types.map(t => <span key={t.type.name} style={{ margin: '0 5px', padding: '5px 10px', background: '#eee', borderRadius: '5px' }}>{t.type.name}</span>)}

      <h3>Estadísticas Base:</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {pokemon.stats.map(s => (
          <li key={s.stat.name}><strong>{s.stat.name}:</strong> {s.base_stat}</li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonDetailView;