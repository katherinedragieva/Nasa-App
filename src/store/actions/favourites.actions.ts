import { createAction, props } from "@ngrx/store";

export const addToFavourites = createAction(
  "[Favourites] Add Favourites",
  props<{ favourites: any[] }>()
);

export const removeFromFavourites = createAction(
  "[Favourites] Remove From Favourites",
  props<{ url: string }>()
);

export const loadFavourites = createAction("[Favorites] Load Favourite Photos");

export const setFavourites = createAction(
  "[Favourites] Set Favourites",
  props<{ favourites: any[] }>()
);
