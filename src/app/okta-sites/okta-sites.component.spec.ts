import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OktaSitesComponent } from './okta-sites.component';

describe('OktaSitesComponent', () => {
  let component: OktaSitesComponent;
  let fixture: ComponentFixture<OktaSitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OktaSitesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OktaSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
