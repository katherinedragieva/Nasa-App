import { Component, inject, OnInit } from "@angular/core";
import { loadApods } from "../../store/actions/nasa.actions";
import { Store } from "@ngrx/store";
import { selectApods } from "../../store/selectors/nasa.selectors";
import { CommonModule } from "@angular/common";
import { Apod } from "../../models/apod";
import { map, shareReplay } from "rxjs/operators";
import { MatIconModule } from "@angular/material/icon";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { FavouritesDialogComponent } from "../favourites-dialog/favourites-dialog.component";
import {
  addToFavourites,
  removeFromFavourites,
} from "../../store/actions/favourites.actions";
import { selectAllFavourites } from "../../store/selectors/favourites.selectors";
import { DestroyRef } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-apod",
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDialogModule],
  templateUrl: "./apod.component.html",
  styleUrl: "./apod.component.scss",
})
export class ApodComponent implements OnInit {
  hideImageExplanation = true;
  imageVisibilityMap: Record<string, boolean> = {};
  favouriteIds: Record<string, boolean> = {};

  readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  apods$ = this.store.select(selectApods).pipe(
    map((apods) => {
      const today = new Date().toISOString().split("T")[0];
      return [...apods].sort((a, b) =>
        a.date === today
          ? -1
          : b.date === today
            ? 1
            : b.date.localeCompare(a.date)
      );
    }),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  favourites$ = this.store.select(selectAllFavourites).pipe(shareReplay(1));

  favouriteMap$ = this.favourites$.pipe(
    map((favourites) => {
      return favourites.reduce(
        (acc: Record<string, boolean>, fav: { url: string }) => {
          acc[fav.url] = true;
          return acc;
        },
        {}
      );
    })
  );

  constructor(private store: Store) {}

  ngOnInit() {
    const today = new Date();
    const startDate = this.formatDate(
      new Date(today.setDate(today.getDate() - 6))
    ); // 7 days ago
    const endDate = this.formatDate(new Date());

    this.store.dispatch(loadApods({ startDate, endDate }));
  }

  private formatDate(date: Date): string {
    return date.toISOString().split("T")[0];
  }

  showImageExplanation(apod: Apod) {
    this.imageVisibilityMap[apod.title] = !this.imageVisibilityMap[apod.title];
  }

  toggleFavourite(apod: Apod, isFavourite: boolean) {
    if (isFavourite) {
      this.store.dispatch(removeFromFavourites({ url: apod.url }));
    } else {
      const dialogRef = this.dialog.open(FavouritesDialogComponent, {
        data: apod,
      });

      dialogRef
        .afterClosed()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((result) => {
          if (result?.addedToFavorites) {
            this.favouriteIds[apod.url] = true;
          }
        });
    }
  }
}
