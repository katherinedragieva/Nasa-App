import { createReducer, on } from "@ngrx/store";
import {
  addToFavourites,
  removeFromFavourites,
  setFavourites,
} from "../actions/favourites.actions";

export interface FavouritesState {
  favourites: any[];
}

const initialState: FavouritesState = {
  favourites: [],
};

export const favouritesReducer = createReducer(
  initialState,
  on(setFavourites, (state, { favourites }) => ({ ...state, favourites })),
  on(addToFavourites, (state, { favourites }) => ({
    ...state,
    favourites: [...state.favourites, ...favourites],
  })),
  on(removeFromFavourites, (state, { url }) => ({
    ...state,
    favourites: state.favourites.filter((apod) => apod.url !== url),
  }))
);
