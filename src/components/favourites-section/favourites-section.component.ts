import { Component } from "@angular/core";
import { selectAllFavourites } from "../../store/selectors/favourites.selectors";
import { Store } from "@ngrx/store";
import {
  loadFavourites,
  removeFromFavourites,
} from "../../store/actions/favourites.actions";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { shareReplay } from "rxjs/operators";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-favourites-section",
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: "./favourites-section.component.html",
  styleUrl: "./favourites-section.component.scss",
})
export class FavouritesSectionComponent {
  favorites$ = this.store
    .select(selectAllFavourites)
    .pipe(shareReplay({ bufferSize: 1, refCount: true }));

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadFavourites());
  }

  removeFromFavourites(url: string) {
    this.store.dispatch(removeFromFavourites({ url }));
  }
}
