import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldtimeComponent } from './worldtime.component';

describe('WorldtimeComponent', () => {
  let component: WorldtimeComponent;
  let fixture: ComponentFixture<WorldtimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorldtimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorldtimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
