import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaItemComponent } from './meta-item.component';

describe('MetaItemComponent', () => {
  let component: MetaItemComponent;
  let fixture: ComponentFixture<MetaItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetaItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MetaItemComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
