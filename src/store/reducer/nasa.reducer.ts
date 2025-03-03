import { createReducer, on } from "@ngrx/store";
import {
  loadApodsSuccess,
  loadMarsPhotos,
  loadMarsPhotosFailure,
  loadMarsPhotosSuccess,
} from "../actions/nasa.actions";

export interface NasaState {
  apods: any[];
  marsPhotos: any[];
  totalPhotos: number;
  error: null;
  loading: boolean;
}

export const initialState: NasaState = {
  apods: [],
  marsPhotos: [],
  totalPhotos: 0,
  error: null,
  loading: false,
};

export const nasaReducer = createReducer(
  initialState,
  on(loadApodsSuccess, (state, { apods }) => ({ ...state, apods })),
  on(loadMarsPhotos, (state) => ({
    ...state,
    loading: true,
  })),
  on(loadMarsPhotosSuccess, (state, { marsPhotos, totalPhotos }) => ({
    ...state,
    marsPhotos,
    totalPhotos,
    loading: false,
  })),
  on(loadMarsPhotosFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
