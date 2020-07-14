import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StatalertePage } from './statalerte.page';

describe('StatalertePage', () => {
  let component: StatalertePage;
  let fixture: ComponentFixture<StatalertePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatalertePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StatalertePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
