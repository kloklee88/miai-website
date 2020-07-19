import { Component, OnInit, Input } from '@angular/core';
import { Player, PlayerList } from './player.model';
import { MiaiService } from '../../services/miai.service';

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
  invalidForm: boolean = false;
  loading: boolean = false;
  @Input() balanceOption: String;

  constructor(private miaiService: MiaiService) { }

  ngOnInit(): void {
    this.initChosenPlayers();
    this.getAllPlayers();
    this.getAllRoles();
  }

  getAllPlayers() {
    this.miaiService.getAllPlayers().subscribe(response => {
      this.players = response.players;
      this.filteredPlayers = response.players;
    });
  }

  getAllRoles() {
    this.miaiService.getAllRoles().subscribe(response => {
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
    //console.log("Balance Option: " + this.balanceOption);
    let playersPopulated = true;
    for (let i = 0; i < this.chosenPlayers.length; i++) {
      if (this.chosenPlayers[i].name === undefined) {
        //console.log("Balance form is invalid")
        playersPopulated = false;
        break;
      }
    }
    if (playersPopulated && this.balanceOption != null) {
      this.invalidForm = false;
      this.loading = true;
      let playerList = new PlayerList();
      playerList.players = this.chosenPlayers;
      playerList.balanceOption = this.balanceOption;
      console.log(JSON.stringify(playerList));
      this.miaiService.balancePlayers(playerList).subscribe(response => {
        console.log(response);
        this.balancedTeam = response;
        this.loading = false;
      });
    } else {
      this.invalidForm = true;
    }
  }

  //Temporary to auto set data for testing
  randomData() {
    console.log("Randomize Data");
    for (let i = 0; i < this.chosenPlayers.length; i++) {
      let player = new Player();
      let randomPlayerIndex;
      //Make unique random player names
      do {
        randomPlayerIndex = Math.floor(Math.random() * this.players.length);
      } while (this.chosenPlayers.some(e => e.name === this.players[randomPlayerIndex].name))
      player.name = this.players[randomPlayerIndex].name;
      let randomRoleIndex = Math.floor(Math.random() * this.roles.length);
      //player.chosenRoles = [this.roles[randomRoleIndex]];
      this.chosenPlayers[i] = player;
    }
  }

}
