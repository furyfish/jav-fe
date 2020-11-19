import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerbDetailsComponent } from './verb-details.component';

describe('VerbDetailsComponent', () => {
  let component: VerbDetailsComponent;
  let fixture: ComponentFixture<VerbDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerbDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerbDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
