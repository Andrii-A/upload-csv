import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Papa } from 'ngx-papaparse';
import { mockData } from './common/helpers/mockData';
import { TestHelperModule } from './common/helpers/test.helpers.module';

const SpyPapa = jasmine.createSpyObj('Papa', ['parse']);


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestHelperModule],
      declarations: [AppComponent],
      providers: [
        { provide: Papa, useValue: SpyPapa }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    component.tableHeader = mockData[ 0 ];
    component.tableBody = [...mockData.slice(1, mockData.length)];
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should sort by DESC/ASC order`, () => {
    component.toggleSortOrder();
    expect(component.tableBody[ 0 ][ 0 ]).toEqual('Dayle');

    component.toggleSortOrder();
    expect(component.tableBody[ 0 ][ 0 ]).toEqual('Bernard');
  });

});

