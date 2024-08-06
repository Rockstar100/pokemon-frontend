import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddPokemon() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonAbility, setPokemonAbility] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  const handleAddPokemon = async (e) => {
    e.preventDefault();
    const updatedUser = users.find(user => user.pokemonOwnerName === selectedUser);
    updatedUser.pokemons.push({
      pokemonName,
      pokemonAbility,
    });
    await axios.put(`http://localhost:5000/users/${updatedUser.pokemonOwnerName}`, updatedUser);
    setPokemonName('');
    setPokemonAbility('');
  };

  return (
    <div>
      <h2>Add Pokémon</h2>
      <form onSubmit={handleAddPokemon}>
        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
          <option>Select User</option>
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
