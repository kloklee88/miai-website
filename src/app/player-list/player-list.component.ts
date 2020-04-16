import { Component, OnInit } from '@angular/core';
import { PlayerService } from './player-list.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  subscription: Subscription;
  connectionAvailable: Boolean = false;
  speedInMs: Number;

  constructor(private playerService: PlayerService,
    private router: Router,
    private route: ActivatedRoute) { }

    ngOnInit() {
      this.playerService.testConnection().subscribe(response => {
        console.log(response);
      });
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
        console.log(response);
      });
    }
  
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }

}
