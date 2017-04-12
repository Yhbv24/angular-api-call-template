import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class ApiService {
  episodes: FirebaseListObservable<any[]>;
  episodesObjects: any = [];

  constructor(private angularFire: AngularFire) {
    this.episodes = angularFire.database.list('bobross');
  }

  getEpisodes() {
    this.episodes.subscribe(data => {
      for (let i: number = 1; i < data.length; i++) {
        this.episodesObjects.push(data[i]);
      }
    })
    return this.episodesObjects;
  }

}
