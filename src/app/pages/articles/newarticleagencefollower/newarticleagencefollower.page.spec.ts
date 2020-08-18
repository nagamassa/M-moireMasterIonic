import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewarticleagencefollowerPage } from './newarticleagencefollower.page';

describe('NewarticleagencefollowerPage', () => {
  let component: NewarticleagencefollowerPage;
  let fixture: ComponentFixture<NewarticleagencefollowerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewarticleagencefollowerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewarticleagencefollowerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
