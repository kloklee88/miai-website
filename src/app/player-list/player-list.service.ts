import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from './player/player.model';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) { }

  testConnection() {
    //return this.http.get('https://inhouse-balancer-service.herokuapp.com/miai/areyouthere');
    return this.http.get<Boolean>('http://localhost:9010/miai/areyouthere');
  }

  testPerformance(iteration: Number) {
    return this.http.get<Number>('http://localhost:9010/miai/testperformance/' + iteration);
  }

  getException() {
    return this.http.get('http://localhost:9010/miai/throwexception');
  }

  getAllPlayers() {
    return this.http.get<Player[]>('http://localhost:9010/miai/getallplayers').pipe(map(responseData => {
      const playerArray = [];
      //console.log(responseData);
      for (const key in responseData) {
        if(responseData.hasOwnProperty(key)) {
          playerArray.push(responseData[key])
        }
      }
      return playerArray;
    }));
  }

  getBalanceOptions() {
    return this.http.get<String[]>('http://localhost:9010/miai/getbalanceoptions');
  }

  getAllRoles() {
    return this.http.get<String[]>('http://localhost:9010/miai/getallroles');
  }

  getSinglePlayer() {
    return this.http.get('http://localhost:9010/miai/getplayer/Rags/20/RGAPI-8fa0400a-fd4a-41d2-a688-cb9715564a41');
  }

  balancePlayers(postData: {}) {
    return this.http.post('http://localhost:9010/miai/balance', postData);
  }
}
