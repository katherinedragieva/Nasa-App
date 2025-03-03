import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FavouritesState } from "../reducer/favourites.reducer";

export const selectFavouritesState =
  createFeatureSelector<FavouritesState>("favourites");

export const selectAllFavourites = createSelector(
  selectFavouritesState,
  (state) => state.favourites
);

export const selectAllFavouritesCounter = createSelector(
  selectFavouritesState,
  (state) => state.favourites.length
);
