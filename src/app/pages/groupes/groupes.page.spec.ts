import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GroupesPage } from './groupes.page';

describe('GroupesPage', () => {
  let component: GroupesPage;
  let fixture: ComponentFixture<GroupesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GroupesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
