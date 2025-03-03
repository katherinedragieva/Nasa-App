import { Component, OnInit } from "@angular/core";
import {
  ReactiveFormsModule,
  FormControl,
  FormsModule,
  Validators,
} from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { Store } from "@ngrx/store";
import { NasaState } from "../../store/reducer/nasa.reducer";
import { loadMarsPhotos } from "../../store/actions/nasa.actions";
import { shareReplay } from "rxjs/operators";
import {
  selectLoading,
  selectMarsPhotos,
  selectTotalRoverPhotos,
} from "../../store/selectors/nasa.selectors";
import { MatCardModule } from "@angular/material/card";
import { CommonModule } from "@angular/common";
import { MatSelectModule } from "@angular/material/select";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";

@Component({
  selector: "app-mars-rover",
  imports: [
    CommonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    MatProgressBarModule,
  ],
  templateUrl: "./mars-rover.component.html",
  styleUrl: "./mars-rover.component.scss",
})
export class MarsRoverComponent implements OnInit {
  dropdownOptions = ["Curiosity", "Opportunity", "Spirit"];
  isSubmitButtonDisabled = true;
  sol = new FormControl<number | null>(null, [Validators.pattern("^[0-9]+$")]);
  roverName = new FormControl("", Validators.required);
  currentPage = 1;
  pageSize = 25;

  marsPhotos$ = this.store
    .select(selectMarsPhotos)
    .pipe(shareReplay({ bufferSize: 1, refCount: true }));

  totalPhotos$ = this.store
    .select(selectTotalRoverPhotos)
    .pipe(shareReplay({ bufferSize: 1, refCount: true }));

  marsPhotosLoading$ = this.store
    .select(selectLoading)
    .pipe(shareReplay({ bufferSize: 1, refCount: true }));

  constructor(private store: Store<{ nasa: NasaState }>) {}

  ngOnInit() {
    this.sol.disable();

    this.sol.valueChanges.subscribe((value) => {
      if (value !== null && this.sol.errors === null) {
        this.isSubmitButtonDisabled = false;
      } else {
        this.isSubmitButtonDisabled = true;
      }
    });
  }

  validateNumber(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  onSelectionChange() {
    this.sol.enable();
  }

  onSearchPhotos() {
    if (this.roverName.value && this.sol.value) {
      this.store.dispatch(
        loadMarsPhotos({
          rover: this.roverName.value,
          sol: this.sol.value,
          page: this.currentPage,
          perPage: this.pageSize,
        })
      );
    }
  }

  loadPhotos() {
    if (this.roverName.value) {
      this.store.dispatch(
        loadMarsPhotos({
          rover: this.roverName.value,
          sol: 1000,
          page: this.currentPage,
          perPage: this.pageSize,
        })
      );
    }
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.loadPhotos();
  }
}
