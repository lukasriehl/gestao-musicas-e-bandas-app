import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManutMusicasComponent } from './manut-musicas.component';

describe('ManutMusicasComponent', () => {
  let component: ManutMusicasComponent;
  let fixture: ComponentFixture<ManutMusicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManutMusicasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManutMusicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
