import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManutBandasComponent } from './manut-bandas.component';

describe('ManutBandasComponent', () => {
  let component: ManutBandasComponent;
  let fixture: ComponentFixture<ManutBandasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManutBandasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManutBandasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
