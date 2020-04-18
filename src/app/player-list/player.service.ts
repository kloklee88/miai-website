import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PlayerList } from './player/player.model';

import { BalancedTeam } from './balanced-team.model';

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
    return this.http.get<PlayerList>('http://localhost:9010/miai/getallplayers');
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

  balancePlayers(playerList: PlayerList) {
    return this.http.post<BalancedTeam>('http://localhost:9010/miai/balance', JSON.stringify(playerList), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }
}
