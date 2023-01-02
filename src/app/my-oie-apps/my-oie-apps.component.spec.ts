import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOieAppsComponent } from './my-oie-apps.component';

describe('MyOieAppsComponent', () => {
  let component: MyOieAppsComponent;
  let fixture: ComponentFixture<MyOieAppsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyOieAppsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyOieAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
