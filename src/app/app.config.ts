import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { routes } from "./app.routes";
import { provideStore } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";
import { NasaEffects } from "../store/effects/nasa.effects";
import { provideHttpClient } from "@angular/common/http";
import { FavouritesEffects } from "../store/effects/favourites.effects";
import { reducers } from "../store/reducer/app.reducer";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideStore(reducers),
    provideEffects([NasaEffects, FavouritesEffects]),
    provideStoreDevtools(),
  ],
};
