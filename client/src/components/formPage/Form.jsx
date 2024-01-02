import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPokemon, get_types } from "../../redux/actions";
import validation from "./validation";
import style from "./Form.module.css";

const Form = () => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

  const [errors, setErrors] = useState({});

  const [pokemonData, setPokemonData] = useState({
    name: "",
    image: "",
    life: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
  });

  useEffect(() => {
    dispatch(get_types());
  }, [dispatch]);

  const handleChange = (event) => {
    if (event.target.name === "types")
      return setPokemonData({
        ...pokemonData,
        types: [...pokemonData.types, event.target.value],
      });
    setPokemonData({
      ...pokemonData,
      [event.target.name]: event.target.value,
    });

    setErrors(
      validation({ ...pokemonData, [event.target.name]: event.target.value })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createPokemon(pokemonData));
  };

  return (
    <div className={style.div}>
      <form className={style.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          onChange={handleChange}
        />
        <p>{errors.name}</p>
        <input
          type="text"
          name="image"
          placeholder="Imagen URL"
          onChange={handleChange}
        />
        {pokemonData.image && (
          <img src={pokemonData.image} alt="Vista previa de la imagen" />
        )}
        <p>{errors.image}</p>
        <input
          type="number"
          name="life"
          placeholder="Vida"
          onChange={handleChange}
        />
        <p>{errors.life}</p>
        <input
          type="number"
          name="attack"
          placeholder="Ataque"
          onChange={handleChange}
        />
        <p>{errors.attack}</p>
        <input
          type="number"
          name="defense"
          placeholder="Defensa"
          onChange={handleChange}
        />
        <p>{errors.defense}</p>

        <input
          type="number"
          name="height"
          placeholder="Altura"
          onChange={handleChange}
        />
        <p>{errors.height}</p>
        <input
          type="number"
          name="weight"
          placeholder="Peso"
          onChange={handleChange}
        />
        <p>{errors.weight}</p>
        <select
          className={style.button}
          name="types"
          multiple
          onChange={handleChange}
        >
          {types.map((type) => (
            <option className={style.button} key={type.id} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
        {errors.types && <p>{errors.types}</p>}
        <button type="submit">Capturar</button>
      </form>
    </div>
  );
};

export default Form;
