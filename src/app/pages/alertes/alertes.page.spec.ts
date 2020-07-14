import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlertesPage } from './alertes.page';

describe('AlertesPage', () => {
  let component: AlertesPage;
  let fixture: ComponentFixture<AlertesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlertesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
