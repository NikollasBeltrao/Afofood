import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DoRequestPage } from './do-request.page';

describe('DoRequestPage', () => {
  let component: DoRequestPage;
  let fixture: ComponentFixture<DoRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoRequestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DoRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
