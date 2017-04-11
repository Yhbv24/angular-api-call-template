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
  populationObjects: any = [];
  totalPopulation: any = [];

  constructor(element: ElementRef, d3Service: D3Service, private apiService: ApiService) {
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {
    this.apiService.getDataFromApi().subscribe((data) =>
    this.populationObjects = data); // Loads API data
  }

  showData() {
    for (let i: number = 0; i < this.populationObjects.length; i++) {
      this.totalPopulation.push(this.populationObjects[i].total);
    }

    let d3 = this.d3;
    let d3ParentElement: Selection<any, any, any, any>;
    let h: number = 600; // height
    let w: number = 1100; // Width
    let barPadding: number = 1;
    let parentNativeElement: any = this.parentNativeElement;
    let totalPopulation: any = this.totalPopulation;

    if (parentNativeElement !== null) {
      d3ParentElement = this.d3.select(this.parentNativeElement);

      let svg: any = d3.select(".show-data")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

      svg.selectAll("rect")
      .data(totalPopulation)
      .enter()
      .append("rect")
      .attr("x", function(d:any, i:any) {
        return i * (w / totalPopulation.length);
      })
      .attr("y", function(d:any) {
        return h - (d * 4);
      })
      .attr("width", w / totalPopulation.length - barPadding)
      .attr("height", function(d:any) {
        return d * 4;
      })
      .attr("fill", function(d:any) {
        return "rgb(0, 0, " + (d * 10) + ")";
      });

      svg.selectAll('text')
      .data(this.totalPopulation)
      .enter()
      .append('text')
      .text(function(d:any) {
        return d;
      })
      .attr("x", function(d:any, i:any) {
        return i * (w / totalPopulation.length) + (w / totalPopulation.length - barPadding) / 2;
      })
      .attr("y", function(d:any) {
        return h - (d * 4) + 14;  //15 is now 14
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", "11px")
      .attr("fill", "white")
      .attr("text-anchor", "middle");
    }
  }

}
