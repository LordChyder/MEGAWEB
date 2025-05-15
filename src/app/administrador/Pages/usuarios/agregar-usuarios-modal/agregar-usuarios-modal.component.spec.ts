import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarUsuariosModalComponent } from './agregar-usuarios-modal.component';

describe('AgregarUsuariosModalComponent', () => {
  let component: AgregarUsuariosModalComponent;
  let fixture: ComponentFixture<AgregarUsuariosModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarUsuariosModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarUsuariosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
