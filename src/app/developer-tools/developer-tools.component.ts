import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player-list/player.service';

@Component({
  selector: 'app-developer-tools',
  templateUrl: './developer-tools.component.html',
  styleUrls: ['./developer-tools.component.css']
})
export class DeveloperToolsComponent implements OnInit {
  connectionAvailable: Boolean = null;
  speedInMs: Number = null;

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
  }

  testConnection() {
    this.playerService.testConnection().subscribe(response => {
      console.log(response);
      this.connectionAvailable = response;
    }, error => {
      //console.log(error);
      this.connectionAvailable = false;
    });
  }

  testPerformance(iteration: Number) {
    this.playerService.testPerformance(iteration).subscribe(response => {
      this.speedInMs = response;
    }, error => {
      //console.log(error);
      this.speedInMs = -1;
    });
  }

}
