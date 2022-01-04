import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { LoaderService } from './services/loader.service';

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  //title = 'mat-table-simple';
  title = 'CYSFA';

  constructor(private loader: LoaderService, @Inject(DOCUMENT) document: any) {}
}
