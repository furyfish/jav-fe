import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerbAddComponent } from './verb-add.component';

describe('VerbAddComponent', () => {
  let component: VerbAddComponent;
  let fixture: ComponentFixture<VerbAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerbAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerbAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
