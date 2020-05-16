import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCityCardComponent } from './add-city-card.component';

describe('AddCityCardComponent', () => {
  let component: AddCityCardComponent;
  let fixture: ComponentFixture<AddCityCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCityCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
