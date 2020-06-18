import { Component, OnInit } from '@angular/core';
import { MiaiService } from '../services/miai.service';
import { BalancedChampion } from './balanced-champion.model';

@Component({
  selector: 'app-aram',
  templateUrl: './aram.component.html',
  styleUrls: ['./aram.component.css']
})
export class AramComponent implements OnInit {
  balancedTeam: BalancedChampion;
  numberChampions: number;

  constructor(private miaiService: MiaiService) { }

  ngOnInit(): void {
  }

  randomizeAram() {
    this.miaiService.randomizeAram(this.numberChampions*2).subscribe(response => {
      this.balancedTeam = response;
      console.log(this.balancedTeam);
    });
  }

}
