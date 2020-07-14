import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PiecepopupPage } from './piecepopup.page';

describe('PiecepopupPage', () => {
  let component: PiecepopupPage;
  let fixture: ComponentFixture<PiecepopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiecepopupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PiecepopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
