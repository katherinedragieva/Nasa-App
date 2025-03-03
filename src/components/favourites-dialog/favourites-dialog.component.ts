import { Component, Inject, OnInit } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { Apod } from "../../models/apod";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { Store } from "@ngrx/store";
import { addToFavourites } from "../../store/actions/favourites.actions";
import { FavouritesState } from "../../store/reducer/favourites.reducer";

@Component({
  selector: "app-favourites-dialog",
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: "./favourites-dialog.component.html",
  styleUrl: "./favourites-dialog.component.scss",
})
export class FavouritesDialogComponent implements OnInit {
  imageTitle = new FormControl("");

  ngOnInit(): void {
    this.imageTitle.setValue(this.apodData.title);
  }

  constructor(
    public dialogRef: MatDialogRef<FavouritesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public apodData: Apod,
    private store: Store<{ favourites: FavouritesState }>
  ) {}

  save() {
    const updatedApod = {
      ...this.apodData,
      title: this.imageTitle.value,
    };

    this.store.dispatch(addToFavourites({ favourites: [updatedApod] }));

    this.dialogRef.close({ addedToFavorites: true });
  }

  close() {
    this.dialogRef.close({ addedToFavorites: false });
  }
}
