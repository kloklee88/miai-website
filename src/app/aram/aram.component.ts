import { Component, OnInit } from '@angular/core';
import { MiaiService } from '../services/miai.service';
import { BalancedChampion } from './balanced-champion.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-aram',
  templateUrl: './aram.component.html',
  styleUrls: ['./aram.component.css']
})
export class AramComponent implements OnInit {
  balancedTeam: BalancedChampion;
  numberChampions: number;
  loading: boolean = false;
  invalidForm: boolean = false;

  constructor(private miaiService: MiaiService) { }

  ngOnInit(): void {
  }

  randomizeAram() {
    console.log(this.numberChampions);
    if (this.numberChampions !== undefined) {
      this.invalidForm = false;
      this.loading = true;
      this.miaiService.randomizeAram(this.numberChampions * 2).subscribe(response => {
        this.balancedTeam = response;
        console.log(this.balancedTeam);
        this.loading = false;
      });
    } else {
      this.invalidForm = true;
    }
  }

}
