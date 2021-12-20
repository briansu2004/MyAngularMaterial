import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Licence } from 'src/app/models/Licence';
import { LICENSE_DATA } from 'src/app/services/license_data';
import { LicenceService } from 'src/app/services/licence.service';
import { LoaderService } from 'src/app/services/loader.service';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  faAngleDoubleUp,
  faAngleDown,
  faAngleUp,
  faBan,
  faExclamation,
  faFilter,
  faQuestionCircle,
  faSort,
  faSortDown,
  faSortUp,
} from '@fortawesome/free-solid-svg-icons';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, AfterViewInit {
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

  form!: FormGroup;

  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  faExclamation = faExclamation;
  faQuestionCircle = faQuestionCircle;
  faAngleDoubleUp = faAngleDoubleUp;
  faFilter = faFilter;
  faBan = faBan;
  faSort = faSort;
  faSortUp = faSortUp;
  faSortDown = faSortDown;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private licenceService: LicenceService
  ) {}

  @ViewChild(MatPaginator)
  paginator!: MatPaginator | null;

  @ViewChild(MatSort) sort!: MatSort;

  // @ViewChild(MatSort) filterValue!: string;

  loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  ngOnInit(): void {
    this.dataSource.data = [];

    // Sorry - wait 2 seconds here purposely
    //await timer(2000).pipe(take(1)).toPromise();
    //timer(5000).pipe(take(1)).toPromise();

    // Using JSON
    //dataSource = new MatTableDataSource<Licence>(LICENSE_DATA);

    // Using mock by JSON-Server or real API
    this.licenceService.getLicences().subscribe(
      async (data: any) => {
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
