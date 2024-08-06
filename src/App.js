import React from 'react';
import { Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.js';
import AddUser from './pages/AddUser.js/index.js';
import AddPokemon from './pages/AddPokemon.js/index.js';
import PokemonList from './pages/PokemonList.js/index.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/add-pokemon" element={<AddPokemon />} />
        <Route path="/pokemon-list" element={<PokemonList />} />
      </Routes>
    </Router>
  );
}

export default App;
