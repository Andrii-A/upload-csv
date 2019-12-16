import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Pipe, PipeTransform } from '@angular/core';
import { Papa } from 'ngx-papaparse';

const SpyPapa = jasmine.createSpyObj('Papa', ['parse']);


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, MockFilesizePipe],
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
    expect(component.tableBody[0][0]).toEqual('Dayle');

    component.toggleSortOrder();
    expect(component.tableBody[0][0]).toEqual('Bernard');
  });

  it(`should format date of birth for chart labels`, () => {
    expect(component.mapDate('12/16/2019')).toEqual('2019-12-16');
  });

});


@Pipe({
  name: 'filesize'
})
export class MockFilesizePipe implements PipeTransform {
  transform(value) {
    return value;
  }
}



const mockData = [
  ['First name', 'Sur name', 'Issue count', 'Date of birth'],
  [
    'Osbert',
    'Goodisson',
    '33',
    '11/5/2018'
  ],
  [
    'Barr',
    'Meader',
    '81',
    '11/25/2018'
  ],
  [
    'Kerrin',
    'Gilhouley',
    '71',
    '8/1/2019'
  ],
  [
    'Joli',
    'Masters',
    '79',
    '7/11/2019'
  ],
  [
    'Rem',
    'Baggott',
    '44',
    '9/25/2019'
  ],
  [
    'Gary',
    'Hopfer',
    '34',
    '10/21/2019'
  ],
  [
    'Anya',
    'Jumont',
    '45',
    '10/23/2019'
  ],
  [
    'Cristiano',
    'Wallach',
    '34',
    '6/19/2019'
  ],
  [
    'Dayle',
    'Maroney',
    '2',
    '9/22/2019'
  ],
  [
    'Bernard',
    'Feedome',
    '90',
    '2/11/2019'
  ],
  [
    'Rooney',
    'Proctor',
    '35',
    '3/22/2019'
  ],
  [
    'Patric',
    'Iglesiaz',
    '35',
    '7/25/2019'
  ]
];
