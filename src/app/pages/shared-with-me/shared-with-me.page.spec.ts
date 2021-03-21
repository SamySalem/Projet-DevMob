import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SharedWithMePage } from './shared-with-me.page';

describe('SharedWithMePage', () => {
  let component: SharedWithMePage;
  let fixture: ComponentFixture<SharedWithMePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedWithMePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SharedWithMePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
