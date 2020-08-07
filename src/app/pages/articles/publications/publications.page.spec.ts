import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PublicationsPage } from './publications.page';

describe('PublicationsPage', () => {
  let component: PublicationsPage;
  let fixture: ComponentFixture<PublicationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PublicationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
