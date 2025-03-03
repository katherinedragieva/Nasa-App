import { Routes } from "@angular/router";
import { ApodComponent } from "../components/apod/apod.component";
import { MarsRoverComponent } from "../components/mars-rover/mars-rover.component";
import { FavouritesSectionComponent } from "../components/favourites-section/favourites-section.component";

export const routes: Routes = [
  { path: "apod", component: ApodComponent },
  { path: "mars-rover", component: MarsRoverComponent },
  { path: "favourites-section", component: FavouritesSectionComponent },
  { path: "", redirectTo: "apod", pathMatch: "full" },
  { path: "**", redirectTo: "apod" },
];
