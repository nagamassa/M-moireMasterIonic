import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContactsalertePage } from './contactsalerte.page';

describe('ContactsalertePage', () => {
  let component: ContactsalertePage;
  let fixture: ComponentFixture<ContactsalertePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsalertePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactsalertePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
