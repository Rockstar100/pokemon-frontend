const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = [
  {
    pokemonOwnerName: "Ash Ketchum",
    pokemons: [
      { pokemonName: "Pikachu", pokemonAbility: "Static" },
      { pokemonName: "Charizard", pokemonAbility: "Blaze" },
    ],
  },
  {
    pokemonOwnerName: "Misty",
    pokemons: [{ pokemonName: "Staryu", pokemonAbility: "Illuminate" }],
  },
];

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  const newUser = req.body;
  if (!newUser || !newUser.pokemonOwnerName) {
    return res.status(400).json({ message: "pokemonOwnerName is required" });
  }
  users.push(newUser);
  res.status(201).json(newUser);
});

app.put("/users/:ownerName", (req, res) => {
  const { ownerName } = req.params;
  const index = users.findIndex((u) => u.pokemonOwnerName === ownerName);
  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }
  users[index] = req.body;
  res.json(users[index]);
});

app.delete("/users/:ownerName", (req, res) => {
  const { ownerName } = req.params;
  const initialLength = users.length;
  users = users.filter((u) => u.pokemonOwnerName !== ownerName);
  if (users.length === initialLength) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(204).send();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Mock API listening on port ${PORT}`));
