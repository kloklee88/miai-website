import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PlayerList, Player } from '../player-list/player/player.model';

import { BalancedTeam } from '../player-list/balanced-team.model';
import { BalancedChampion } from '../aram/balanced-champion.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MiaiService {

  constructor(private http: HttpClient) { }

  testConnection() {
    return this.http.get<Boolean>(environment.miaiServiceUrl + "/miai/areyouthere");
  }

  testPerformance(iteration: Number) {
    return this.http.get<Number>(environment.miaiServiceUrl + "/miai/testperformance/" + iteration);
  }

  getException() {
    return this.http.get(environment.miaiServiceUrl + "/miai/throwexception");
  }

  getAllPlayers() {
    return this.http.get<PlayerList>(environment.miaiServiceUrl + "/miai/getallplayers");
  }

  getBalanceOptions() {
    return this.http.get<String[]>(environment.miaiServiceUrl + "/miai/getbalanceoptions");
  }

  getAllRoles() {
    return this.http.get<String[]>(environment.miaiServiceUrl + "/miai/getallroles");
  }

  getSinglePlayer(name: string, numberRecords: number) {
    return this.http.get<Player>(environment.miaiServiceUrl + "/miai/getplayer/" + name + "/" + numberRecords);
  }

  balancePlayers(playerList: PlayerList) {
    return this.http.post<BalancedTeam>(environment.miaiServiceUrl + "/miai/balance", JSON.stringify(playerList), { headers: new HttpHeaders({ "Content-Type": "application/json" }) });
  }

  randomizeAram(numberChampions: number) {
    return this.http.get<BalancedChampion>(environment.miaiServiceUrl + "/miai/aram/" + numberChampions);
  }
}
