import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsortiumsComponent } from './consortiums.component';

describe('ConsortiumComponent', () => {
  let component: ConsortiumsComponent;
  let fixture: ComponentFixture<ConsortiumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsortiumsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsortiumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
