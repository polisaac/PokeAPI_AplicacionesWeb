import { usePokemons } from '../hooks/usePokemons';
import { PokemonCard } from '../components/PokemonCard';

const Home = () => {
  const {
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
  } = usePokemons();

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>POKÉDEX</h2>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '30px' }}>
        <input 
          type="text" 
          placeholder="Buscar por nombre..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', width: '250px' }}
        />
        
        <select 
          value={selectedType} 
          onChange={(e) => setSelectedType(e.target.value)}
          style={{ padding: '10px', borderRadius: '6px', textTransform: 'capitalize' }}
        >
          <option value="">Todos los tipos</option>
          {types.map(t => (
            <option key={t.name} value={t.name}>{t.name}</option>
          ))}
        </select>

        <button onClick={clearFilters} style={{ padding: '10px 15px', cursor: 'pointer', borderRadius: '6px' }}>
          Reset
        </button>
      </div>

      {error && <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>{error}</p>}
      {loading && <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>Consultando al Profesor Oak...</p>}
      
      {!loading && !error && displayedPokemons.length === 0 && (
        <p style={{ textAlign: 'center', color: '#666' }}>Ningún Pokémon coincide con tu búsqueda.</p>
      )}

      {!loading && !error && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px' }}>
          {displayedPokemons.map((p) => (
            <PokemonCard 
              key={p.name} 
              name={p.name} 
              url={p.url} 
              isFavorite={favorites.includes(p.name)}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;