import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player-list/player.service';
import { BalancedChampion } from './balanced-champion.model';

@Component({
  selector: 'app-aram',
  templateUrl: './aram.component.html',
  styleUrls: ['./aram.component.css']
})
export class AramComponent implements OnInit {
  balancedTeam: BalancedChampion;
  numberChampions: number;

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
  }

  randomizeAram() {
    this.playerService.randomizeAram(this.numberChampions*2).subscribe(response => {
      this.balancedTeam = response;
      console.log(this.balancedTeam);
    });
  }

}
