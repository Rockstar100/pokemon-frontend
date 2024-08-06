import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PokemonList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    await axios.delete(`http://localhost:5000/users/${userId}`);
    setUsers(users.filter(user => user.pokemonOwnerName !== userId));
  };

  return (
    <div>
      <h2>Pokemon List</h2>
      <table>
        <thead>
          <tr>
            <th>Owner Name</th>
            <th>Pokemon Name</th>
            <th>Pokemon Ability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            user.pokemons.map(pokemon => (
              <tr key={`${user.pokemonOwnerName}-${pokemon.pokemonName}`}>
                <td>{user.pokemonOwnerName}</td>
                <td>{pokemon.pokemonName}</td>
                <td>{pokemon.pokemonAbility}</td>
                <td>
                  <button onClick={() => handleDeleteUser(user.pokemonOwnerName)}>Delete</button>
                </td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PokemonList;
