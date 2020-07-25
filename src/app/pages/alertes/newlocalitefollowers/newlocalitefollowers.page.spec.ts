import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewlocalitefollowersPage } from './newlocalitefollowers.page';

describe('NewlocalitefollowersPage', () => {
  let component: NewlocalitefollowersPage;
  let fixture: ComponentFixture<NewlocalitefollowersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewlocalitefollowersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewlocalitefollowersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
