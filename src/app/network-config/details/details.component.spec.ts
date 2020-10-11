import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DetailsComponent} from './details.component';
import {Server} from '../../_services/server';
import {HttpClient} from '@angular/common/http';

describe('fetch', () => {

});

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
