import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class ApiService {
  episodes: FirebaseListObservable<any[]>;
  episodesObjects: any = [];
  seasons: FirebaseListObservable<any[]>;

  constructor(private angularFire: AngularFire) {
    this.episodes = angularFire.database.list('bobross');
    this.seasons = angularFire.database.list('seasons');
  }

  getEpisodes() {
    this.episodes.subscribe(data => {
      for (let i: number = 1; i < data.length; i++) {
        this.episodesObjects.push(data[i]);
      }
    })
    return this.episodesObjects;
  }

  getSeasons() {
    let season = {};
    let container = [];
    let seasons = this.seasons;

    this.episodesObjects.forEach(function(episode, i) {
      if (i > 0) {
        let keyArray = Object.keys(episode);
        keyArray.forEach(function(key) {
          if (episode[key] < 2) {
            if (episode[key]) {
              let number: number = parseInt(episode[key]);
              if (!season[key]) {
                season[key] = 0;
              }
              season[key] = season[key] + number;
            }
          }
        })
        if (i % 13 === 0) {
          seasons.push(season);
          container.push(season);
          season = {};
        }
      }
    })
    return container;
  }

}
