import { Component, OnInit, Input } from '@angular/core';
import { PlayerService } from './player.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Player } from './player/player.model';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  balanceOptions: String[];
  roles: String[];
  players: Player[];
  balanceOption: String;

  constructor(private playerService: PlayerService,
    private router: Router,
    private route: ActivatedRoute) { }

    ngOnInit() {
      this.getBalanceOptions();
    }
  
    onNewPlayer() {
      this.router.navigate(['new'], {relativeTo: this.route});
    }

    getBalanceOptions() {
      this.playerService.getBalanceOptions().subscribe(response => {
        //console.log(response);
        this.balanceOptions = response;
      });
    }
}
