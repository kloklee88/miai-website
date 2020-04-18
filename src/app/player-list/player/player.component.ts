import { Component, OnInit, Input } from '@angular/core';
import { Player, PlayerList } from './player.model';
import { PlayerService } from '../player.service';

import * as _ from 'lodash';
import { BalancedTeam } from '../balanced-team.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  roles: String[];
  players: Player[];
  filteredPlayers: Player[] = [];
  chosenPlayers: Player[] = [];
  balancedTeam: BalancedTeam;
  @Input() balanceOption: String;

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.initChosenPlayers();
    this.getAllPlayers();
    this.getAllRoles();
  }

  getAllPlayers() {
    this.playerService.getAllPlayers().subscribe(response => {
      this.players = response.players;
      this.filteredPlayers = response.players;
    });
  }

  getAllRoles() {
    this.playerService.getAllRoles().subscribe(response => {
      //console.log(response);
      this.roles = response;
    });
  }

  initChosenPlayers() {
    for (let i = 0; i < 10; i++) {
      this.chosenPlayers.push(new Player());
    }
  }

  playerNameChange() {
    console.log("Player name change called");
    //Filter out selected player from rest of dropdowns
    //this.filteredPlayers = _.filter(this.players, player => this.chosenPlayers.indexOf(player) > -1)
  }

  balancePlayers() {
    console.log("Balance Option: " +this.balanceOption);
    let playerList = new PlayerList();
    playerList.players = this.chosenPlayers;
    playerList.balanceOption = this.balanceOption;
    console.log(playerList);
    console.log(JSON.stringify(playerList));
    this.playerService.balancePlayers(playerList).subscribe(response => {
      console.log(response);
      this.balancedTeam = response;
    });
  }

}
