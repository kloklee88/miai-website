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
      //console.log(response);
      this.connectionAvailable = response;
    });
  }

  testPerformance(iteration: Number) {
    this.playerService.testPerformance(iteration).subscribe(response => {
      //console.log(response);
      this.speedInMs = response;
    });
  }

}
