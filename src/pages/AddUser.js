import React, { useState } from 'react';
import axios from 'axios';

function AddUser() {
  const [pokemonOwnerName, setPokemonOwnerName] = useState('');
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonAbility, setPokemonAbility] = useState('');
  const [initialPositionX, setInitialPositionX] = useState(0);
  const [initialPositionY, setInitialPositionY] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [direction, setDirection] = useState('');

  const handleAddUser = async (e) => {
    e.preventDefault();
    const userData = {
      pokemonOwnerName,
      pokemons: [{
        pokemonName,
        pokemonAbility,
        initialPositionX,
        initialPositionY,
        speed,
        direction,
      }],
    };
    await axios.post('http://localhost:5000/users', userData);
    setPokemonOwnerName('');
    setPokemonName('');
    setPokemonAbility('');
    setInitialPositionX(0);
    setInitialPositionY(0);
    setSpeed(0);
    setDirection('');
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleAddUser}>
        <input
          type="text"
          value={pokemonOwnerName}
          onChange={(e) => setPokemonOwnerName(e.target.value)}
          placeholder="Pokemon Owner Name"
          required
        />
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
        <input
          type="number"
          value={initialPositionX}
          onChange={(e) => setInitialPositionX(parseInt(e.target.value))}
          placeholder="Initial Position X"
          required
        />
        <input
          type="number"
          value={initialPositionY}
          onChange={(e) => setInitialPositionY(parseInt(e.target.value))}
          placeholder="Initial Position Y"
          required
        />
        <input
          type="number"
          value={speed}
          onChange={(e) => setSpeed(parseInt(e.target.value))}
          placeholder="Speed"
          required
        />
        <input
          type="text"
          value={direction}
          onChange={(e) => setDirection(e.target.value)}
          placeholder="Direction"
          required
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddUser;
