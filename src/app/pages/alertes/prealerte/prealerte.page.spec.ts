import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrealertePage } from './prealerte.page';

describe('PrealertePage', () => {
  let component: PrealertePage;
  let fixture: ComponentFixture<PrealertePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrealertePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrealertePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
