import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewgroupefollowersPage } from './newgroupefollowers.page';

describe('NewgroupefollowersPage', () => {
  let component: NewgroupefollowersPage;
  let fixture: ComponentFixture<NewgroupefollowersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewgroupefollowersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewgroupefollowersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
