import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComponent } from './chart.component';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    component.model = mockModel;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


const mockModel = `First name,Sur name,Issue count,Date of birth
Osbert,Goodisson,33,11/5/2018
Barr,Meader,81,11/25/2018
Kerrin,Gilhouley,71,8/1/2019
Joli,Masters,79,7/11/2019
Rem,Baggott,44,9/25/2019
Gary,Hopfer,34,10/21/2019
Anya,Jumont,45,10/23/2019
Cristiano,Wallach,34,6/19/2019
Dayle,Maroney,2,9/22/2019
Bernard,Feedome,90,2/11/2019
Rooney,Proctor,35,3/22/2019
Patric,Iglesiaz,35,7/25/2019
Cleve,Greatbanks,7,10/7/2019
Alexi,Longbothom,61,6/13/2019
Auberta,Greenmon,16,10/14/2019
Winnah,Clixby,24,6/7/2019
Jennine,Cough,45,10/10/2019
Maison,Glidden,19,5/9/2019
Elaine,Rable,9,6/2/2019
Charlot,Coombes,21,5/23/2019`;
