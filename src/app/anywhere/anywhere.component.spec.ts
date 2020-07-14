import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AnywhereComponent } from './anywhere.component';

describe('AnywhereComponent', () => {
  let component: AnywhereComponent;
  let fixture: ComponentFixture<AnywhereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnywhereComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AnywhereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
