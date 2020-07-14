import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HistalertePage } from './histalerte.page';

describe('HistalertePage', () => {
  let component: HistalertePage;
  let fixture: ComponentFixture<HistalertePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistalertePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HistalertePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
