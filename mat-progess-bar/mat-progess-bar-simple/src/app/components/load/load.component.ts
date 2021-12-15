import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.css'],
})
export class LoadComponent implements OnInit {
  constructor(public loaderService: LoaderService) {}

  ngOnInit(): void {}
}
