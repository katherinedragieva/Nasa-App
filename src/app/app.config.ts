import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { routes } from "./app.routes";
import { provideStore } from "@ngrx/store";
import { nasaReducer } from "../store/reducer/nasa.reducer";
import { provideEffects } from "@ngrx/effects";
import { NasaEffects } from "../store/effects/nasa.effects";
import { provideHttpClient } from "@angular/common/http";
import { favouritesReducer } from "../store/reducer/favourites.reducer";
import { FavouritesEffects } from "../store/effects/favourites.effects";
import { reducers } from "../store/reducer/app.reducer";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    // provideStore({ nasa: nasaReducer,
    //   favourites: favouritesReducer,
    //  }),
    provideStore(reducers),
    provideEffects([NasaEffects, FavouritesEffects]),
    provideStoreDevtools(),
    // {
    //   provide: 'APP_INITIALIZER',
    //   useFactory: () => {
    //     return () => {
    //       const store = inject(Store);
    //       store.dispatch(loadApod({ date: new Date().toISOString().split('T')[0] }));
    //     };
    //   },
    //   multi: true
    // }
  ],
};
