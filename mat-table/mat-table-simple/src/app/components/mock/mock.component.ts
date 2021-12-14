import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Licence } from 'src/app/models/Licence';
import { LICENSE_DATA } from 'src/app/services/license_data';
import { LicenceService } from 'src/app/services/licence.service';

@Component({
  selector: 'app-mock',
  templateUrl: './mock.component.html',
  styleUrls: ['./mock.component.css'],
})
export class MockComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'licId',
    'licNo',
    'licType',
    'licName',
    'licPlace',
    'licPhone',
    'licCondition',
  ];

  dataSource = new MatTableDataSource<Licence>();

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private licenceService: LicenceService
  ) {}

  @ViewChild(MatPaginator)
  paginator!: MatPaginator | null;

  @ViewChild(MatSort) sort!: MatSort;

  // @ViewChild(MatSort) filterValue!: string;

  ngOnInit(): void {
    // Using JSON
    //dataSource = new MatTableDataSource<Licence>(LICENSE_DATA);

    // Using mock by JSON-Server or real API
    this.licenceService
      .getLicences()
      // .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (data: any) => {
          console.log('[ngOnInit] data: ', data);
          if (data) {
            this.dataSource.data = data;
          }
        },
        (err: any) => {
          console.log('[ngOnInit] err: ', err);
        }
      );
  }

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
    if (event.target && event.target.value && event.target.value !== '') {
      this.dataSource.filter = event.target.value.trim().toLowerCase();
    }
  }

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

  //total = this.transactions
  //  .map(t => t.cost)
  //  .reduce((acc, value) => acc + value, 0);

  // analysisWeight(element: any) {
  //   const result =
  //     'Min: ' +
  //     this.dataSource.data
  //       .map((t) => t.weight)
  //       .reduce((acc, value) => Math.min(acc, value)) +
  //     '; Max: ' +
  //     this.dataSource.data
  //       .map((t) => t.weight)
  //       .reduce((acc, value) => Math.max(acc, value)) +
  //     '; Total: ' +
  //     this.dataSource.data
  //       .map((t) => t.weight)
  //       .reduce((acc, value) => acc + value, 0);

  //   return result;
  // }
}
