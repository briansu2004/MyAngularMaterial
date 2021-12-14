import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  score: number;
  SingleString: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    score: 100,
    SingleString: 'a',
  },
  {
    position: 2,
    name: 'Helium',
    weight: 4.0026,
    symbol: 'He',
    score: 100,
    SingleString: 'a',
  },
  {
    position: 3,
    name: 'Lithium',
    weight: 6.941,
    symbol: 'Li',
    score: 100,
    SingleString: 'a',
  },
  {
    position: 4,
    name: 'Beryllium',
    weight: 9.0122,
    symbol: 'Be',
    score: 100,
    SingleString: 'a',
  },
  {
    position: 5,
    name: 'Boron',
    weight: 10.811,
    symbol: 'B',
    score: 100,
    SingleString: 'a',
  },
  {
    position: 6,
    name: 'Carbon',
    weight: 12.0107,
    symbol: 'C',
    score: 100,
    SingleString: 'a',
  },
  {
    position: 7,
    name: 'Nitrogen',
    weight: 14.0067,
    symbol: 'N',
    score: 100,
    SingleString: 'a',
  },
  {
    position: 8,
    name: 'Oxygen',
    weight: 15.9994,
    symbol: 'O',
    score: 100,
    SingleString: 'a',
  },
  {
    position: 9,
    name: 'Fluorine',
    weight: 18.9984,
    symbol: 'F',
    score: 100,
    SingleString: 'a',
  },
  {
    position: 10,
    name: 'Neon',
    weight: 20.1797,
    symbol: 'Ne',
    score: 100,
    SingleString: 'a',
  },
];

/**
 * @title Basic use of `<table mat-table>`
 */

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css'],
})
export class BasicComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  title = 'mat-table-simple';

  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'score',
    'SingleString',
  ];
  dataSource = ELEMENT_DATA;
}
