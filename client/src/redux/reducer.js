import {
  CLEAR_DETAIL,
  CLEAR_RESULTS,
  FILTER_ORIGIN,
  FILTER_TYPE,
  GET_ALL_POKEMONS,
  GET_BY_ID,
  GET_BY_NAME,
  GET_TYPES,
  ORDER_ALF,
  ORDER_ATTACK,
  POST_POKEMONS
} from "./actions-types";

const initialState = {
  pokemons: [],
  newPokes: [],
  pokemonsid: [],
  types: [],
  pokemonsCopy: []
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case GET_ALL_POKEMONS:
      return { ...state, pokemonsCopy: actions.payload, pokemons: actions.payload };

    case GET_BY_NAME:
      const stateCopy = { ...state, pokemons: [actions.payload] };
      return { ...state, pokemons: [actions.payload] };

    case GET_BY_ID:
      return { ...state, pokemonsid: actions.payload };

    case POST_POKEMONS:
      return { ...state, newPokes: [...state.newPokes, actions.payload], pokemons: [...state.pokemons, actions.payload] };

    case GET_TYPES:
      return { ...state, types: actions.payload };

    case FILTER_TYPE:
      const dataCopy = [...state.pokemonsCopy];
      const response = [...dataCopy.filter((poke) => poke.types && poke.types.map(elemn => elemn.trim()).includes(actions.payload))];
      return { ...state, pokemons: response };

    case FILTER_ORIGIN:
      let filterOrigin;
      if (actions.payload === "api") {
        filterOrigin = state.pokemonsCopy.filter((poke) => poke.id.toString().length < 6);
      }
      if (actions.payload === "db") {
        filterOrigin = state.pokemonsCopy.filter((poke) => poke.id.toString().length > 6);
      }
      return { ...state, pokemons: [...filterOrigin] };

    case ORDER_ATTACK:
      let orderedByAttack = [...state.pokemons];
      if (actions.payload === 'asc') {
        orderedByAttack.sort((a, b) => a.attack - b.attack);
      } else if (actions.payload === 'desc') {
        orderedByAttack.sort((a, b) => b.attack - a.attack);
      }
      return { ...state, pokemons: orderedByAttack };

    case ORDER_ALF:
      let orderedAlphabetically = [...state.pokemons];
      if (actions.payload === 'asc') {
        orderedAlphabetically.sort((a, b) => a.name.localeCompare(b.name));
      } else if (actions.payload === 'desc') {
        orderedAlphabetically.sort((a, b) => b.name.localeCompare(a.name));
      }
      return { ...state, pokemons: orderedAlphabetically };

    case CLEAR_RESULTS:
      return { ...state, pokemons: [] };

    case CLEAR_DETAIL:
      return { ...state, pokemonsid: [] };

    default: {
      return { ...state };
    }
  }
};

export default reducer;
