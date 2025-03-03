import { Injectable, OnInit } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { HttpClient } from "@angular/common/http";
import { catchError, map, mergeMap, of } from "rxjs";
import {
  loadApods,
  loadApodsSuccess,
  loadMarsPhotos,
  loadMarsPhotosFailure,
  loadMarsPhotosSuccess,
} from "../actions/nasa.actions";
import { Apods } from "../../models/apods";

@Injectable()
export class NasaEffects {
  private apiKey = "DEMO_KEY";
  private apiUrl = "https://api.nasa.gov";
  private baseUrl = "https://api.nasa.gov/mars-photos/api/v1";

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}

  loadApods$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadApods),
      mergeMap((action) =>
        this.http
          .get<
            Apods[]
          >(`${this.apiUrl}/planetary/apod?api_key=${this.apiKey}&start_date=${action.startDate}&end_date=${action.endDate}`)
          .pipe(
            map((apods) => loadApodsSuccess({ apods })),
            catchError(() => {
              return of({ type: "[NASA APOD] Load APOD Failed" });
            })
          )
      )
    )
  );

  //   loadMarsPhotos$ = createEffect(() =>
  //     this.actions$.pipe(
  //       ofType(loadMarsPhotos),
  //       mergeMap(action =>
  //         this.http.get(`${this.apiUrl}/mars-photos/api/v1/rovers/${action.rover}/photos?sol=${action.sol}&page=1&api_key=DEMO_KEY

  // &api_key=${this.apiKey}`).pipe(
  //           map((response: any) => loadMarsPhotosSuccess({ photos: response.photos })),
  //           catchError(() => of({ type: '[NASA Mars Rover Photos ] Load Mars Photos Failed' }))
  //         )
  //       )
  //     )
  //   );

  loadMarsPhotos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMarsPhotos),
      mergeMap(({ rover, sol, page, perPage }) =>
        this.http
          .get<any>(`${this.baseUrl}/manifests/${rover}?api_key=${this.apiKey}`)
          .pipe(
            mergeMap((manifestResponse) => {
              const totalPhotos =
                manifestResponse.photo_manifest.photos.find(
                  (p: any) => p.sol === sol
                )?.total_photos || 0;
              const totalPages = Math.ceil(totalPhotos / perPage);

              return this.http
                .get<any>(
                  `${this.baseUrl}/rovers/${rover}/photos?sol=${sol}&page=${page}&per_page=${perPage}&api_key=${this.apiKey}`
                )
                .pipe(
                  map((photoResponse) =>
                    loadMarsPhotosSuccess({
                      marsPhotos: photoResponse.photos,
                      totalPhotos,
                    })
                  ),
                  catchError((error) => of(loadMarsPhotosFailure({ error })))
                );
            }),
            catchError((error) => of(loadMarsPhotosFailure({ error })))
          )
      )
    )
  );
}
