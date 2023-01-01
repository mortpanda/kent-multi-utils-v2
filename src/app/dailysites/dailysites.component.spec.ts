import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailysitesComponent } from './dailysites.component';

describe('DailysitesComponent', () => {
  let component: DailysitesComponent;
  let fixture: ComponentFixture<DailysitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailysitesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailysitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
