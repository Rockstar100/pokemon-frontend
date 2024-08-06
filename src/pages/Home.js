import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

function Home() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  const handleUserChange = (e) => {
    const user = users.find(user => user.pokemonOwnerName === e.target.value);
    setSelectedUser(user);
  };

  return (
    <div className="home-container">
      <h2>Home Page</h2>
      <select className="user-select" onChange={handleUserChange}>
        <option>Select User</option>
        {users.map(user => (
          <option key={user.pokemonOwnerName} value={user.pokemonOwnerName}>
            {user.pokemonOwnerName}
          </option>
        ))}
      </select>
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
