// src/pages/ComparadorView.tsx
import { useNavigate } from 'react-router-dom';
import { useComparador } from '../hooks/useComparador';
import '../App.css';

const TYPE_COLORS: Record<string, string> = {
  fire: '#F08030', water: '#6890F0', grass: '#78C850', electric: '#F8D030',
  psychic: '#F85888', ice: '#98D8D8', dragon: '#7038F8', dark: '#705848',
  fairy: '#EE99AC', normal: '#A8A878', fighting: '#C03028', flying: '#A890F0',
  poison: '#A040A0', ground: '#E0C068', rock: '#B8A038', bug: '#A8B820',
  ghost: '#705898', steel: '#B8B8D0',
};

const STAT_LABELS: Record<string, string> = {
  hp: 'HP', attack: 'Ataque', defense: 'Defensa',
  'special-attack': 'Sp. Ataque', 'special-defense': 'Sp. Defensa', speed: 'Velocidad',
};

const ComparadorView = () => {
  const navigate = useNavigate();
  const {
    pokemon1, pokemon2,
    search1, setSearch1,
    search2, setSearch2,
    loading1, loading2,
    error1, error2,
    buscarPokemon,
    getGanador,
    ganadorGeneral,
    totalStats,
  } = useComparador();

  const allStatNames = pokemon1
    ? pokemon1.stats.map(s => s.stat.name)
    : pokemon2
    ? pokemon2.stats.map(s => s.stat.name)
    : ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];

  const maxStatValue = 255;

  return (
    <div className="comparador-page">
      <button className="btn-volver" onClick={() => navigate(-1)}>← Volver</button>
      <h2 className="comparador-titulo">⚔️ Comparador de Pokémon</h2>
      <p className="comparador-subtitulo">Busca dos Pokémon por nombre o número y compara sus estadísticas</p>

      <div className="comparador-buscadores">
        {([1, 2] as const).map(slot => (
          <div key={slot} className="comparador-buscador">
            <label className="comparador-label">Pokémon {slot}</label>
            <div className="comparador-input-row">
              <input
                type="text"
                placeholder="Nombre o número..."
                value={slot === 1 ? search1 : search2}
                onChange={e => slot === 1 ? setSearch1(e.target.value) : setSearch2(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && buscarPokemon(slot)}
                className="comparador-input"
              />
              <button
                className="comparador-btn-buscar"
                onClick={() => buscarPokemon(slot)}
                disabled={slot === 1 ? loading1 : loading2}
              >
                {(slot === 1 ? loading1 : loading2) ? '...' : 'Buscar'}
              </button>
            </div>
            {(slot === 1 ? error1 : error2) && (
              <p className="comparador-error">{slot === 1 ? error1 : error2}</p>
            )}
          </div>
        ))}
      </div>

      {pokemon1 && pokemon2 && ganadorGeneral && (
        <div className={`comparador-ganador ganador-${ganadorGeneral}`}>
          {ganadorGeneral === 'tie'
            ? '🤝 ¡Empate! Ambos Pokémon están igualados'
            : `🏆 ¡${ganadorGeneral === 1 ? pokemon1.name : pokemon2.name} gana!`}
        </div>
      )}

      <div className="comparador-contenido">
        {/* Tarjeta Pokémon 1 */}
        <div className={`comparador-tarjeta ${ganadorGeneral === 1 ? 'tarjeta-ganador' : ''}`}>
          {pokemon1 ? (
            <>
              <img
                src={pokemon1.sprites.other['official-artwork'].front_default}
                alt={pokemon1.name}
                className="comparador-sprite"
              />
              <h3 className="comparador-nombre">{pokemon1.name.toUpperCase()}</h3>
              <p className="comparador-numero">#{String(pokemon1.id).padStart(3, '0')}</p>
              <div className="comparador-tipos">
                {pokemon1.types.map(t => (
                  <span key={t.type.name} className="tipo-badge"
                    style={{ background: TYPE_COLORS[t.type.name] ?? '#999' }}>
                    {t.type.name}
                  </span>
                ))}
              </div>
              <p className="comparador-total">Total: <strong>{totalStats(pokemon1)}</strong></p>
            </>
          ) : (
            <div className="comparador-placeholder">
              <span>?</span>
              <p>Busca un Pokémon</p>
            </div>
          )}
        </div>

        {/* Stats centrales */}
        <div className="comparador-stats">
          <h4 className="stats-titulo">Estadísticas Base</h4>
          {allStatNames.map(statName => {
            const val1 = pokemon1?.stats.find(s => s.stat.name === statName)?.base_stat;
            const val2 = pokemon2?.stats.find(s => s.stat.name === statName)?.base_stat;
            const ganador = getGanador(statName);

            return (
              <div key={statName} className="stat-row">
                <div className="stat-barra-container izquierda">
                  <span className="stat-valor izq">{val1 ?? '-'}</span>
                  <div className="stat-barra-bg">
                    <div
                      className={`stat-barra izq ${ganador === 1 ? 'barra-ganador' : ganador === 'tie' ? 'barra-empate' : 'barra-perdedor'}`}
                      style={{ width: val1 != null ? `${(val1 / maxStatValue) * 100}%` : '0%' }}
                    />
                  </div>
                </div>
                <div className="stat-nombre-central">
                  {STAT_LABELS[statName] ?? statName}
                </div>
                <div className="stat-barra-container derecha">
                  <div className="stat-barra-bg">
                    <div
                      className={`stat-barra der ${ganador === 2 ? 'barra-ganador' : ganador === 'tie' ? 'barra-empate' : 'barra-perdedor'}`}
                      style={{ width: val2 != null ? `${(val2 / maxStatValue) * 100}%` : '0%' }}
                    />
                  </div>
                  <span className="stat-valor der">{val2 ?? '-'}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tarjeta Pokémon 2 */}
        <div className={`comparador-tarjeta ${ganadorGeneral === 2 ? 'tarjeta-ganador' : ''}`}>
          {pokemon2 ? (
            <>
              <img
                src={pokemon2.sprites.other['official-artwork'].front_default}
                alt={pokemon2.name}
                className="comparador-sprite"
              />
              <h3 className="comparador-nombre">{pokemon2.name.toUpperCase()}</h3>
              <p className="comparador-numero">#{String(pokemon2.id).padStart(3, '0')}</p>
              <div className="comparador-tipos">
                {pokemon2.types.map(t => (
                  <span key={t.type.name} className="tipo-badge"
                    style={{ background: TYPE_COLORS[t.type.name] ?? '#999' }}>
                    {t.type.name}
                  </span>
                ))}
              </div>
              <p className="comparador-total">Total: <strong>{totalStats(pokemon2)}</strong></p>
            </>
          ) : (
            <div className="comparador-placeholder">
              <span>?</span>
              <p>Busca un Pokémon</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComparadorView;