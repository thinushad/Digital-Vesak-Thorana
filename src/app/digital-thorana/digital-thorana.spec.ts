import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalThorana } from './digital-thorana';

describe('DigitalThorana', () => {
  let component: DigitalThorana;
  let fixture: ComponentFixture<DigitalThorana>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DigitalThorana],
    }).compileComponents();

    fixture = TestBed.createComponent(DigitalThorana);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
