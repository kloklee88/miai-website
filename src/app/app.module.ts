import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerComponent } from './player-list/player/player.component';

import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AboutComponent } from './about/about.component';
import { DeveloperToolsComponent } from './developer-tools/developer-tools.component';
import { AramComponent } from './aram/aram.component';
import { InterceptorService } from './services/interceptor.service';
import { MatSpinnerOverlayComponent } from './mat-spinner-overlay/mat-spinner-overlay.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PlayerListComponent,
    PlayerComponent,
    AboutComponent,
    DeveloperToolsComponent,
    AramComponent,
    MatSpinnerOverlayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    BrowserAnimationsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
