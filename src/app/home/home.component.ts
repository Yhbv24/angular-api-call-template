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

  showSeasons() {
    this.apiService.getSeasons();
  }

  showData() {
    let d3 = this.d3;
    let parentNativeElement: any = this.parentNativeElement;
    let d3ParentElement: Selection<any, any, any, any>;

    if (this.parentNativeElement !== null) {
      d3ParentElement = this.d3.select(this.parentNativeElement);

      let h: number = 100; // height
      let w: number = 1100; // Width
      let episodes = this.episodes;
      let barPadding: number = 1;

      let hasMountains: any = [];

      for (let i: number = 1; i < this.episodes.length; i++) {
        hasMountains.push(this.episodes[i].FIELD41 * 20);
      }

      let svg: any = d3.select(".show-data")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

      svg.selectAll("rect")
        .data(hasMountains)
        .enter()
        .append("rect")
        .attr("x", function(d:any, i:any) {
          return i * (w / hasMountains.length);
        })
        .attr("y", function(d:any) {
          return h - (d*4);
        })
        .attr("width", w / hasMountains.length - barPadding)
        .attr("height", function(d:any) {
          return d * 4;
        })
        .attr("fill", function(d:any) {
          return "grey";
        });

        let hasOcean: any = [];

        for (let i: number = 1; i < this.episodes.length; i++) {
          hasOcean.push(this.episodes[i].FIELD43 * 20);
        }

        let svg2: any = d3.select(".show-data-2")
          .append("svg")
          .attr("width", w)
          .attr("height", h);

        svg2.selectAll("rect")
          .data(hasOcean)
          .enter()
          .append("rect")
          .attr("x", function(d:any, i:any) {
            return i * (w / hasOcean.length);
          })
          .attr("y", function(d:any) {
            return h - (d*4);
          })
          .attr("width", w / hasOcean.length - barPadding)
          .attr("height", function(d:any) {
            return d * 4;
          })
          .attr("fill", function(d:any) {
            return "blue";
          });

        let hasTrees: any = [];

        for (let i: number = 1; i < this.episodes.length; i++) {
          hasTrees.push(this.episodes[i].FIELD62 * 20);
        }

        let svg3: any = d3.select(".show-data-3")
          .append("svg")
          .attr("width", w)
          .attr("height", h);

        svg3.selectAll("rect")
          .data(hasTrees)
          .enter()
          .append("rect")
          .attr("x", function(d:any, i:any) {
            return i * (w / hasTrees.length);
          })
          .attr("y", function(d:any) {
            return h - (d*4);
          })
          .attr("width", w / hasTrees.length - barPadding)
          .attr("height", function(d:any) {
            return d * 4;
          })
          .attr("fill", function(d:any) {
            return "green";
          });
    }
  }

}
