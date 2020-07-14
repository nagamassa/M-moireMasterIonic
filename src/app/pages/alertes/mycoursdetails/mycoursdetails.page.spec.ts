import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MycoursdetailsPage } from './mycoursdetails.page';

describe('MycoursdetailsPage', () => {
  let component: MycoursdetailsPage;
  let fixture: ComponentFixture<MycoursdetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MycoursdetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MycoursdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
