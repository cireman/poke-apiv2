import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNameTrainer } from "../store/slices/nameTrainer.slice";

const Home = () => {
  const dispatch = useDispatch();

  const navegate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target.name.value.trim();
    if (inputValue.length !== 0) {
      dispatch(setNameTrainer(inputValue));
      navegate("/pokedex");
    }
    e.target.name.value = "";
  };

  return (
    <div>
      <h1>Hi Trainer!</h1>
      <p>Enter your trainer name</p>
      <form onSubmit={handleSubmit}>
        <input id="name" type="text" />
        <button>Catch them all</button>
      </form>
    </div>
  );
};

export default Home;
