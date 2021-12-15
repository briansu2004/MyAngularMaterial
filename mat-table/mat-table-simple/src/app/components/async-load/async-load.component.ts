import { Component, ViewChild, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Licence } from 'src/app/models/Licence';
import { LicenceService } from 'src/app/services/licence.service';
import { BehaviorSubject, Observable, timer } from 'rxjs';

@Component({
  selector: 'app-async-load',
  templateUrl: './async-load.component.html',
  styleUrls: ['./async-load.component.css'],
})
export class AsyncLoadComponent implements OnInit {
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
    private licenceService: LicenceService,
    public loaderService: LoaderService
  ) {}

  @ViewChild(MatPaginator)
  paginator!: MatPaginator | null;

  @ViewChild(MatSort) sort!: MatSort;

  loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  ngOnInit(): void {
    console.log('Loading...');
    this.loaderService.isLoading.next(true);

    this.dataSource.data = [];

    this.licenceService.getLicences().subscribe(
      async (data: any) => {
        console.log('[ngOnInit] data: ', data);
        if (data) {
          this.dataSource.data = data;
          console.log('Loaded!');
          this.loaderService.isLoading.next(false);
        }
      },
      (err: any) => {
        console.log('[ngOnInit] Error! - ', err);
        this.loaderService.isLoading.next(false);
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
}
