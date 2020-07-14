import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AutresarticlesPage } from './autresarticles.page';

describe('AutresarticlesPage', () => {
  let component: AutresarticlesPage;
  let fixture: ComponentFixture<AutresarticlesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutresarticlesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AutresarticlesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
