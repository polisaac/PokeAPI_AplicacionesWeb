import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PokemonDetailView from './pages/PokemonDetailView';

function App() {
  return (
    <BrowserRouter>
      {/* Esto se verá en TODAS las páginas */}
      <header style={{ padding: '20px', background: '#333', color: 'white', textAlign: 'center' }}>
        <h1>PokeAPI</h1>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<PokemonDetailView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;