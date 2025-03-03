import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { FavouritesService } from "../../services/favourites.service";
import { map, tap, withLatestFrom } from "rxjs/operators";
import { selectAllFavourites } from "../selectors/favourites.selectors";
import {
  addToFavourites,
  loadFavourites,
  removeFromFavourites,
  setFavourites,
} from "../actions/favourites.actions";

@Injectable()
export class FavouritesEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private favouritesService: FavouritesService
  ) {}

  loadFavourites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFavourites),
      map(() => {
        const favourites = this.favouritesService.getFavourites();
        return setFavourites({ favourites });
      })
    )
  );

  saveFavourites$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addToFavourites, removeFromFavourites),
        withLatestFrom(this.store.select(selectAllFavourites)),
        tap(([_, favourites]) =>
          this.favouritesService.saveFavourites(favourites)
        )
      ),
    { dispatch: false }
  );
}
