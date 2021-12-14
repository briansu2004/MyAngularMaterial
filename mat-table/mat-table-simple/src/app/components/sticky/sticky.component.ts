import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
  { position: 21, name: 'Unknown', weight: 99.999, symbol: 'Xx' },
];

@Component({
  selector: 'app-sticky',
  templateUrl: './sticky.component.html',
  styleUrls: ['./sticky.component.css'],
})
export class StickyComponent implements OnInit, AfterViewInit {
  ngOnInit(): void {}

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  // const initialSelection = [];

  // const allowMultiSelect = true;

  // this.selection = new SelectionModel<MyDataType>(allowMultiSelect, initialSelection);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator | null;

  @ViewChild(MatSort) sort!: MatSort;

  // @ViewChild(MatSort) filterValue!: string;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction} ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(event: any) {
    // console.log('[applyFilter] event: ', event);
    // console.log('[applyFilter] event.target: ', event.target);
    // console.log('[applyFilter] event.target.value: ', event.target.value);

    if (event.target && event.target.value && event.target.value !== '') {
      this.dataSource.filter = event.target.value.trim().toLowerCase();
    }
  }

  // calculateTotalWeight() {
  //   return '100';
  // }

  // getMinValue(columnName: any) {
  //   return this.transactions
  //     .map(t => t[columnName])
  //     .reduce((acc, value) => Math.min(acc, value));
  // }

  // getMinItem(columnName: any) {
  //   return this.transactions
  //     .map(t => t[columnName])
  //     .reduce((acc, value) => Math.min(acc, value));
  // }

  analysisWeight(element: any) {
    //console.log('[calcTotalWeight] ', element);

    const result =
      'Min: ' +
      this.dataSource.data
        .map((t) => t.weight)
        .reduce((acc, value) => Math.min(acc, value)) +
      '; Max: ' +
      this.dataSource.data
        .map((t) => t.weight)
        .reduce((acc, value) => Math.max(acc, value)) +
      '; Total: ' +
      this.dataSource.data
        .map((t) => t.weight)
        .reduce((acc, value) => acc + value, 0);

    return result;
  }

  //total = this.transactions
  //  .map(t => t.cost)
  //  .reduce((acc, value) => acc + value, 0);
}
