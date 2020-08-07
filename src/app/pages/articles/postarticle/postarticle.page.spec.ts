import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PostarticlePage } from './postarticle.page';

describe('PostarticlePage', () => {
  let component: PostarticlePage;
  let fixture: ComponentFixture<PostarticlePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostarticlePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PostarticlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
