import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(public loaderService: LoaderService) {}

  ngOnInit(): void {
    this.loaderService.isLoading.next(true);

    setTimeout(() => {
      console.log('Delay 3 seconds');
      this.loaderService.isLoading.next(false);
    }, 3000);
  }
}
