import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableTailwindComponent } from './data-table.component';

describe('DataTableTailwindComponent', () => {
  let component: DataTableTailwindComponent;
  let fixture: ComponentFixture<DataTableTailwindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataTableTailwindComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableTailwindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
