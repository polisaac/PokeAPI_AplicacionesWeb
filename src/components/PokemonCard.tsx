import { Link } from 'react-router-dom';

interface Props {
  name: string;
  url: string;
}

export const PokemonCard = ({ name, url }: Props) => {
  const id = url.split('/').filter(Boolean).pop();
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <Link to={`/pokemon/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', textAlign: 'center', cursor: 'pointer' }}>
        <img src={imageUrl} alt={name} style={{ width: '100px' }} />
        <h3 style={{ textTransform: 'capitalize' }}>{name}</h3>
        <p>#{id?.padStart(3, '0')}</p>
      </div>
    </Link>
  );
};