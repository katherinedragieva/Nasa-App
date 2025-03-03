import { Component, OnInit } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { selectAllFavouritesCounter } from "../../store/selectors/favourites.selectors";
import { shareReplay } from "rxjs";
import { Store } from "@ngrx/store";
import { CommonModule } from "@angular/common";
import { loadFavourites } from "../../store/actions/favourites.actions";
import { MatBadgeModule } from "@angular/material/badge";

@Component({
  selector: "app-tabs",
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    CommonModule,
    MatBadgeModule,
  ],
  templateUrl: "./tabs.component.html",
  styleUrl: "./tabs.component.scss",
})
export class TabsComponent implements OnInit {
  favoritesCounter$ = this.store
    .select(selectAllFavouritesCounter)
    .pipe(shareReplay({ bufferSize: 1, refCount: true }));

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadFavourites());
  }
}
