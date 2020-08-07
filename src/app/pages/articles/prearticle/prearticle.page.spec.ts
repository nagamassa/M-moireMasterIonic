import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrearticlePage } from './prearticle.page';

describe('PrearticlePage', () => {
  let component: PrearticlePage;
  let fixture: ComponentFixture<PrearticlePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrearticlePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrearticlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
