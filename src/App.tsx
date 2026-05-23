// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Home from './pages/Home';
import PokemonDetailView from './pages/PokemonDetailView';
import ComparadorView from './pages/ComparadorView';

function App() {
  return (
    <BrowserRouter>
      <header style={{ padding: '16px 28px', background: '#231c7f', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
          <h1 style={{ margin: 0, fontSize: '1.6rem' }}>PokeAPI</h1>
        </Link>
        <Link to="/comparador" style={{ textDecoration: 'none' }}>
          <button style={{
            background: '#ef5350', color: 'white', border: 'none',
            padding: '8px 18px', borderRadius: '8px', fontWeight: 'bold',
            cursor: 'pointer', fontSize: '0.95rem'
          }}>
            ⚔️ Comparador
          </button>
        </Link>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<PokemonDetailView />} />
        <Route path="/comparador" element={<ComparadorView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;