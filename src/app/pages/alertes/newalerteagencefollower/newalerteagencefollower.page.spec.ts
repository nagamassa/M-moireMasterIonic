import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewalerteagencefollowerPage } from './newalerteagencefollower.page';

describe('NewalerteagencefollowerPage', () => {
  let component: NewalerteagencefollowerPage;
  let fixture: ComponentFixture<NewalerteagencefollowerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewalerteagencefollowerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewalerteagencefollowerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
