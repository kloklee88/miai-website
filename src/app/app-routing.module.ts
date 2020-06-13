import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerListComponent } from './player-list/player-list.component';
import { DeveloperToolsComponent } from './developer-tools/developer-tools.component';
import { AboutComponent } from './about/about.component';
import { AramComponent } from './aram/aram.component';


const routes: Routes = [
  { path: '', redirectTo: '/about', pathMatch: 'full' },
  { path: 'balance', component: PlayerListComponent },
  { path: 'about', component: AboutComponent },
  { path: 'developer-tools', component: DeveloperToolsComponent },
  { path: 'aram', component: AramComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
