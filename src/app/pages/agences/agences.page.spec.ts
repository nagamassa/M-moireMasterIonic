import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgencesPage } from './agences.page';

describe('AgencesPage', () => {
  let component: AgencesPage;
  let fixture: ComponentFixture<AgencesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgencesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
