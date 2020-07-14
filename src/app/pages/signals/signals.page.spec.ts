import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SignalsPage } from './signals.page';

describe('SignalsPage', () => {
  let component: SignalsPage;
  let fixture: ComponentFixture<SignalsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignalsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SignalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
