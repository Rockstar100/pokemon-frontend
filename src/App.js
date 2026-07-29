import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home.js';
import AddUser from './pages/AddUser.js';
import AddPokemon from './pages/AddPokemon.js';
import PokemonList from './pages/PokemonList.js';
import './App.css';

function App() {
  return (
    <Router>
      <nav className="app-nav">
        <Link to="/">Home</Link>
        <Link to="/add-user">Add User</Link>
        <Link to="/add-pokemon">Add Pokémon</Link>
        <Link to="/pokemon-list">Pokemon List</Link>
      </nav>
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
