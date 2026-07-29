import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import './PokemonList.css';

function PokemonList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/users`);
        setUsers(response.data);
      } catch (err) {
        setError('Could not load users. Is the API running?');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${API_URL}/users/${userId}`);
      setUsers(users.filter(user => user.pokemonOwnerName !== userId));
    } catch (err) {
      setError('Could not delete user.');
    }
  };

  if (loading) return <div className="pokemon-list-container">Loading...</div>;
  if (error) return <div className="pokemon-list-container">{error}</div>;

  return (
    <div className="pokemon-list-container">
      <h2>Pokemon List</h2>
      {users.length === 0 && <p>No users yet.</p>}
      <table className="pokemon-table">
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
                  <button
                    className="action-button"
                    onClick={() => handleDeleteUser(user.pokemonOwnerName)}
                  >
                    Delete
                  </button>
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
