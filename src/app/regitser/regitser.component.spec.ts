import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegitserComponent } from './regitser.component';

describe('RegitserComponent', () => {
  let component: RegitserComponent;
  let fixture: ComponentFixture<RegitserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegitserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegitserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
