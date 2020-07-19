import { Component, OnInit, Input } from '@angular/core';
import { Player, PlayerList } from './player.model';
import { MiaiService } from '../../services/miai.service';

import * as _ from 'lodash';
import { BalancedTeam } from '../balanced-team.model';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

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
  playerControl = new FormControl();
  filteredOptions: Observable<Player[]>;
  @Input() balanceOption: String;

  constructor(private miaiService: MiaiService) { }

  ngOnInit(): void {
    this.initChosenPlayers();
    this.getAllPlayers();
    this.getAllRoles();
    this.setupFilter();
  }

  setupFilter() {
    this.filteredOptions = this.playerControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): Player[] {
    if (value == undefined) {
      return this.filteredPlayers;
    }
    const filterValue = value.toLowerCase();

    //This removes any chosen players from the filteredPlayer list
    for (let i = 0; i < this.chosenPlayers.length; i++) {
      this.filteredPlayers = this.filteredPlayers.filter(option => option.name != this.chosenPlayers[i].name);
    }
    //This allows searching from the remaining list
    return this.filteredPlayers.filter(option => option.name.toLowerCase().includes(filterValue));
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
    //TODO: Fix problem with playerControl causing same values of randominized name
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
