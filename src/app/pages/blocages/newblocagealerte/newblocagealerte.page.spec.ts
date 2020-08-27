import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewblocagealertePage } from './newblocagealerte.page';

describe('NewblocagealertePage', () => {
  let component: NewblocagealertePage;
  let fixture: ComponentFixture<NewblocagealertePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewblocagealertePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewblocagealertePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
