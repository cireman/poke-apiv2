import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatPokemon from "./StatPokemon";
import "./style/pokemonCard.css";

const PokemonCard = ({ url }) => {
  const [pokemon, setPokemon] = useState();

  const navegate = useNavigate();

  useEffect(() => {
    axios
      .get(url)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleClick = () => navegate(`/pokedex/${pokemon.name}`);

  return (
    <article
      className={`pokecard br-${pokemon?.types[0].type.name}`}
      onClick={handleClick}
    >
      <header className={`pokecard__header bg-${pokemon?.types[0].type.name}`}>
        <img
          className="pokecard__img"
          src={pokemon?.sprites.other["official-artwork"]["front_default"]}
          alt=""
        />
      </header>
      <div className="pokecard__info-container">
        <section className="pokecard__body">
          <h3 className="pokecard__name">{pokemon?.name}</h3>
          <ul className="pokecard__type">
            {pokemon?.types.map((slot) => (
              <li key={slot.type.url}>{slot.type.name}</li>
            ))}
          </ul>
        </section>
        <footer className="pokecard__footer">
          <ul className="pokecard__stat">
            {pokemon?.stats.map((stat) => (
              <StatPokemon key={stat.stat.url} infoStat={stat} />
            ))}
          </ul>
        </footer>
      </div>
    </article>
  );
};

export default PokemonCard;
