import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContactsgroupePage } from './contactsgroupe.page';

describe('ContactsgroupePage', () => {
  let component: ContactsgroupePage;
  let fixture: ComponentFixture<ContactsgroupePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsgroupePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactsgroupePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
