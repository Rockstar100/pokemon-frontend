import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import './AddPokemon.css';

function AddPokemon() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonAbility, setPokemonAbility] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/users`);
        setUsers(response.data);
      } catch (err) {
        setError('Could not load users. Is the API running?');
      }
    };
    fetchUsers();
  }, []);

  const handleAddPokemon = async (e) => {
    e.preventDefault();
    const updatedUser = users.find(user => user.pokemonOwnerName === selectedUser);
    if (!updatedUser) return;
    updatedUser.pokemons.push({
      pokemonName,
      pokemonAbility,
    });
    try {
      await axios.put(`${API_URL}/users/${updatedUser.pokemonOwnerName}`, updatedUser);
      setPokemonName('');
      setPokemonAbility('');
    } catch (err) {
      setError('Could not add Pokémon.');
    }
  };

  return (
    <div className="add-pokemon-container">
      <h2>Add Pokémon</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="add-pokemon-form" onSubmit={handleAddPokemon}>
        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} required>
          <option value="">Select User</option>
          {users.map(user => (
            <option key={user.pokemonOwnerName} value={user.pokemonOwnerName}>
              {user.pokemonOwnerName}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
          placeholder="Pokemon Name"
          required
        />
        <input
          type="text"
          value={pokemonAbility}
          onChange={(e) => setPokemonAbility(e.target.value)}
          placeholder="Pokemon Ability"
          required
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddPokemon;
