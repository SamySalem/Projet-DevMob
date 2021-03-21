import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MylistsPage } from './mylists.page';

describe('MylistsPage', () => {
  let component: MylistsPage;
  let fixture: ComponentFixture<MylistsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MylistsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MylistsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
