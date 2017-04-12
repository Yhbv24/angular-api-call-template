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
  episodes: any = [];

  private d3: D3;
  private parentNativeElement: any;

  constructor(element: ElementRef, d3Service: D3Service, private apiService: ApiService) {
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {
    this.episodes = this.apiService.getEpisodes();
  }

  showData() {
    let d3 = this.d3;
    let parentNativeElement: any = this.parentNativeElement;
    let d3ParentElement: Selection<any, any, any, any>;

    if (parentNativeElement !== null) {
      d3ParentElement = this.d3.select(this.parentNativeElement);

      let h: number = 600; // height
      let w: number = 1100; // Width
      let episodes = this.episodes;
      let barPadding: number = 1;

      let svg: any = d3.select(".show-data")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

      svg.selectAll("rect")
        .data(episodes)
        .enter()
        .append("rect")
        .attr("x", function(d:any, i:any) {
          return i * (w / episodes.length);
        })
        .attr("y", function(d:any) {
          return h - (d*4);
        })
        .attr("width", w / episodes.length - barPadding)
        .attr("height", function(d:any) {
          return d * 4;
        })
        .attr("fill", function(d:any) {
          return "rgb(0, 0, " + (d * 10) + ")";
        });
    }
  }

}
