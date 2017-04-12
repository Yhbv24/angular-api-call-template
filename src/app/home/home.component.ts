import { Component, OnInit, ElementRef } from '@angular/core';
import { D3Service, D3, Selection, ScaleLinear } from 'd3-ng2-service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ApiService]
})
export class HomeComponent implements OnInit {

  private d3: D3;
  private parentNativeElement: any;
  data;

  constructor(element: ElementRef, d3Service: D3Service, private apiService: ApiService) {
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {
    let d3 = this.d3;
    let parentNativeElement: any = this.parentNativeElement;
    let d3ParentElement: Selection<any, any, any, any>;
    let h: number = 600; // height
    let w: number = 1100; // Width

    this.apiService.getDataFromApi().subscribe((data) =>
    this.data = data.data); // Loads API data

    if (parentNativeElement !== null) {
      d3ParentElement = this.d3.select(this.parentNativeElement);
    }
  }

}
