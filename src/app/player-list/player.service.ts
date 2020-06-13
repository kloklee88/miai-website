import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { PlayerList } from './player/player.model';

import { BalancedTeam } from './balanced-team.model';
import { BalancedChampion } from '../aram/balanced-champion.model';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened, please try again later.');
  };

  testConnection() {
    //return this.http.get('https://inhouse-balancer-service.herokuapp.com/miai/areyouthere');
    return this.http.get<Boolean>('http://localhost:9010/miai/areyouthere').pipe(catchError(this.handleError));
  }

  testPerformance(iteration: Number) {
    return this.http.get<Number>('http://localhost:9010/miai/testperformance/' + iteration).pipe(catchError(this.handleError));
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

  randomizeAram(numberChampions: number) {
    return this.http.get<BalancedChampion>('http://localhost:9010/miai/aram/' + numberChampions);
  }
}
