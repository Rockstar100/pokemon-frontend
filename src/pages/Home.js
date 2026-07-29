import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import './Home.css';

function Home() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
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

  const handleUserChange = (e) => {
    const user = users.find(user => user.pokemonOwnerName === e.target.value);
    setSelectedUser(user);
  };

  if (loading) return <div className="home-container">Loading users...</div>;
  if (error) return <div className="home-container">{error}</div>;

  return (
    <div className="home-container">
      <h2>Home Page</h2>
      {users.length === 0 ? (
        <p>No users yet. Add one from the "Add User" page.</p>
      ) : (
        <select className="user-select" onChange={handleUserChange}>
          <option>Select User</option>
          {users.map(user => (
            <option key={user.pokemonOwnerName} value={user.pokemonOwnerName}>
              {user.pokemonOwnerName}
            </option>
          ))}
        </select>
      )}
      {selectedUser && (
        <div className="pokemon-list">
          <h3>{selectedUser.pokemonOwnerName}'s Pokémons</h3>
          <ul>
            {selectedUser.pokemons.map(pokemon => (
              <li key={pokemon.pokemonName}>{pokemon.pokemonName} - {pokemon.pokemonAbility}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Home;
