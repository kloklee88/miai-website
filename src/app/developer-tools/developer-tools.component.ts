import { Component, OnInit } from '@angular/core';
import { MiaiService } from '../services/miai.service';

@Component({
  selector: 'app-developer-tools',
  templateUrl: './developer-tools.component.html',
  styleUrls: ['./developer-tools.component.css']
})
export class DeveloperToolsComponent implements OnInit {
  connectionAvailable: Boolean = null;
  speedInMs: Number = null;

  constructor(private miaiService: MiaiService) { }

  ngOnInit(): void {
  }

  testConnection() {
    this.miaiService.testConnection().subscribe(response => {
      console.log(response);
      this.connectionAvailable = response;
    }, error => {
      //console.log(error);
      this.connectionAvailable = false;
    });
  }

  testPerformance(iteration: Number) {
    this.miaiService.testPerformance(iteration).subscribe(response => {
      this.speedInMs = response;
    }, error => {
      //console.log(error);
      this.speedInMs = -1;
    });
  }

}
