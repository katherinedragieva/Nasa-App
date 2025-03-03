import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritesSectionComponent } from './favourites-section.component';

describe('FavouritesSectionComponent', () => {
  let component: FavouritesSectionComponent;
  let fixture: ComponentFixture<FavouritesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavouritesSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavouritesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
