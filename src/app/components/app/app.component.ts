import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {NgIf} from "@angular/common";
import {SidenavPlaylistsComponent} from "../sidenav-playlists/sidenav-playlists.component";
import {SpotifyApiService} from "../../services/spotify-api/spotify-api.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbar, MatIcon, MatIconButton, RouterLink, MatSidenavModule, NgIf, MatButton, SidenavPlaylistsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularSpotifyClient';
  sidenavOpened: boolean = true;
  isDarkTheme: boolean = false;

  constructor(private spotifyApiService: SpotifyApiService) {
  }

  toggleSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
  }

  toggleTheme() {
    this.spotifyApiService.toggleTheme();
  }
}
