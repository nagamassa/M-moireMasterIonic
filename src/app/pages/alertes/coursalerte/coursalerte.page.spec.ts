import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CoursalertePage } from './coursalerte.page';

describe('CoursalertePage', () => {
  let component: CoursalertePage;
  let fixture: ComponentFixture<CoursalertePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursalertePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CoursalertePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
