import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterRestaurantePage } from './register-restaurante.page';

describe('RegisterRestaurantePage', () => {
  let component: RegisterRestaurantePage;
  let fixture: ComponentFixture<RegisterRestaurantePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterRestaurantePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterRestaurantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
