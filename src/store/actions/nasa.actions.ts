import { createAction, props } from "@ngrx/store";
import { Apods } from "../../models/apods";

export const loadApods = createAction(
  "[NASA APOD] Load APOD",
  props<{ startDate: string; endDate: string }>()
);

export const loadApodsSuccess = createAction(
  "[NASA APOD] Load APOD Success",
  props<{ apods: Apods[] }>()
);

export const loadMarsPhotos = createAction(
  "[NASA Mars Rover Photos] Load Mars Photos",
  props<{ rover: string; sol: number; page: number; perPage: number }>()
);

export const loadMarsPhotosSuccess = createAction(
  "[Mars Rover] Load Photos Success",
  props<{ marsPhotos: any[]; totalPhotos: number }>()
);

export const loadMarsPhotosFailure = createAction(
  "[Mars Rover] Load Photos Failure",
  props<{ error: any }>()
);
