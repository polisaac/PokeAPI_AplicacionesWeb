import { Link } from 'react-router-dom';

interface Props {
  name: string;
  url: string;
  isFavorite: boolean;
  toggleFavorite: (name: string) => void;
}

export const PokemonCard = ({ name, url, isFavorite, toggleFavorite }: Props) => {
  const id = url.split('/').filter(Boolean).pop();
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <Link to={`/pokemon/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <button 
        onClick={() => toggleFavorite(name)}
        style={{ float: 'right', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>
      <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', textAlign: 'center', cursor: 'pointer' }}>
        <img src={imageUrl} alt={name} style={{ width: '100px' }} />
        <h3 style={{ textTransform: 'capitalize' }}>{name}</h3>
        <p>#{id?.padStart(0, '0')}</p>
      </div>
    </Link>
  );
};