import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GroupedetailsPage } from './groupedetails.page';

describe('GroupedetailsPage', () => {
  let component: GroupedetailsPage;
  let fixture: ComponentFixture<GroupedetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupedetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GroupedetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
