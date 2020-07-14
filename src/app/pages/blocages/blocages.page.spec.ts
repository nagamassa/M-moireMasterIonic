import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BlocagesPage } from './blocages.page';

describe('BlocagesPage', () => {
  let component: BlocagesPage;
  let fixture: ComponentFixture<BlocagesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlocagesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BlocagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
