import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class FavouritesService {
  private storageKey = "favourites";

  getFavourites(): any[] {
    const storedFavorites = localStorage.getItem(this.storageKey);
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  }

  saveFavourites(favourites: any[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(favourites));
  }
}
