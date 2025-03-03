import { createFeatureSelector, createSelector } from "@ngrx/store";
import { NasaState } from "../reducer/nasa.reducer";

export const selectNasaState = createFeatureSelector<NasaState>("nasa");

export const selectApods = createSelector(
  selectNasaState,
  (state: NasaState) => state.apods
);

export const selectMarsPhotos = createSelector(
  selectNasaState,
  (state: NasaState) => state.marsPhotos
);

export const selectTotalRoverPhotos = createSelector(
  selectNasaState,
  (state) => state.totalPhotos
);

export const selectLoading = createSelector(
  selectNasaState,
  (state) => state.loading
);
