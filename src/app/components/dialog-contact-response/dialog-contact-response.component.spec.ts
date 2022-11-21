import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogContactResponseComponent } from './dialog-contact-response.component';

describe('DialogContactResponseComponent', () => {
  let component: DialogContactResponseComponent;
  let fixture: ComponentFixture<DialogContactResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogContactResponseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogContactResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
