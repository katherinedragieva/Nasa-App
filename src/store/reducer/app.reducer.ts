import { ActionReducerMap } from "@ngrx/store";
import { nasaReducer, NasaState } from "./nasa.reducer";
import { favouritesReducer, FavouritesState } from "./favourites.reducer";

export interface AppState {
  nasa: NasaState;
  favourites: FavouritesState;
}

export const reducers: ActionReducerMap<AppState> = {
  nasa: nasaReducer,
  favourites: favouritesReducer,
};
