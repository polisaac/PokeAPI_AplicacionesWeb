import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PokemonDetailView from './pages/PokemonDetailView';

function App() {
  return (
    <BrowserRouter>
      <header style={{ padding: '20px', background: '#231c7f', color: 'white', textAlign: 'left' }}>
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