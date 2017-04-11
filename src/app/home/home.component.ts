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
  population: any = [];

  constructor(element: ElementRef, d3Service: D3Service, private apiService: ApiService) {
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {
    let d3 = this.d3;
    let d3ParentElement: Selection<any, any, any, any>;

    if (this.parentNativeElement !== null) {
      d3ParentElement = d3.select(this.parentNativeElement);
    }

    this.apiService.getDataFromApi().subscribe((data) =>
    this.population = data);
  }

  showData() {
    console.log(this.population);
  }

}
