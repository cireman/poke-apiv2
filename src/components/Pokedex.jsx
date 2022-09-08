import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PokemonCard from "./pokedex/PokemonCard";
import SearchInput from "./pokedex/SearchInput";
import SelectType from "./pokedex/SelectType";
import "./pokedex/style/pokemonCard.css";

const Pokedex = () => {
  const [pokemons, setPokemons] = useState();
  const [pokeSearch, setPokeSearch] = useState();
  const [chosenType, setChosenType] = useState("All");

  const nameTrainer = useSelector((state) => state.nameTrainer);

  useEffect(() => {
    if (chosenType !== "All") {
      const URL = `https://pokeapi.co/api/v2/type/${chosenType}`;
      axios
        .get(URL)
        .then((res) => {
          const arr = res.data.pokemon.map((e) => e.pokemon);
          setPokemons({ results: arr });
        })
        .catch((err) => console.log(err));
    } else if (pokeSearch) {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokeSearch}`;
      const obj = {
        results: [{ url }],
      };
      setPokemons(obj);
    } else {
      const URL = "https://pokeapi.co/api/v2/pokemon/";
      axios
        .get(URL)
        .then((res) => setPokemons(res.data))
        .catch((err) => console.log(err));
    }
  }, [pokeSearch, chosenType]);

  return (
    <div>
      <h2>Welcome {nameTrainer}, catch them all</h2>
      <SearchInput
        setPokeSearch={setPokeSearch}
        setChosenType={setChosenType}
      />
      <SelectType
        setPokeSearch={setPokeSearch}
        chosenType={chosenType}
        setChosenType={setChosenType}
      />
      <div className="cards-container">
        {pokemons?.results.map((pokemon) => (
          <PokemonCard key={pokemon.url} url={pokemon.url} />
        ))}
      </div>
    </div>
  );
};

export default Pokedex;
