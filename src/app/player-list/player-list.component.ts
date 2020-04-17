import { Component, OnInit, Input } from '@angular/core';
import { PlayerService } from './player-list.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Player } from './player/player.model';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  subscription: Subscription;
  connectionAvailable: Boolean = false;
  speedInMs: Number = 0;
  balanceOptions: String[];
  roles: String[];
  players: Player[];
  balanceOption: String;

  constructor(private playerService: PlayerService,
    private router: Router,
    private route: ActivatedRoute) { }

    ngOnInit() {
      this.getBalanceOptions();
      this.getAllRoles();
      this.getAllPlayers();
    }
  
    onNewPlayer() {
      this.router.navigate(['new'], {relativeTo: this.route});
    }

    testConnection() {
      this.playerService.testConnection().subscribe(response => {
        console.log(response);
        this.connectionAvailable = response;
      });
    }

    testPerformance(iteration: Number) {
      this.playerService.testPerformance(iteration).subscribe(response => {
        console.log(response);
        this.speedInMs = response;
      });
    }

    getAllPlayers() {
      this.playerService.getAllPlayers().subscribe(response => {
        console.log(response[0]);
        this.players = response[0];
      });
    }

    getBalanceOptions() {
      this.playerService.getBalanceOptions().subscribe(response => {
        console.log(response);
        this.balanceOptions = response;
      });
    }
  
    getAllRoles() {
      this.playerService.getAllRoles().subscribe(response => {
        console.log(response);
        this.roles = response;
      });
    }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }

}
