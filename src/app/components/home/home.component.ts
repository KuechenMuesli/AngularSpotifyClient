import { Component, OnInit } from '@angular/core';
import {SpotifyApiService} from "../../services/spotify-api/spotify-api.service";
import { CommonModule } from '@angular/common';
import {PlaylistsComponent} from "../playlists/playlists.component";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PlaylistsComponent, MatButtonModule],
  templateUrl: 'home.component.html',
})
export class HomeComponent implements OnInit {
  userProfile: any;
  loading = true;

  constructor(private spotifyApiService: SpotifyApiService) {}

  ngOnInit() {
    this.spotifyApiService.getUserProfile().subscribe(
      (data: any) => {
        this.userProfile = data;
        this.loading = false;
      },
      (error: any) => {
        console.error('Error fetching user profile:', error);
        this.loading = false;
      }
    );
  }

  login() {
    const clientId = '8845a843732e4a9dad8c7256a570923e'; // Replace with your actual Spotify client ID
    const redirectUri = 'http://localhost:4200/callback'; // Replace with your redirect URI
    const scopes = "playlist-read-private playlist-read-collaborative user-library-read user-modify-playback-state user-read-playback-state "
    "user-read-currently-playing user-read-recently-played user-follow-read user-follow-modify user-top-read "
    "user-read-email user-read-private streaming app-remote-control playlist-modify-public playlist-modify-private "
    "playlist-read-collaborative";

    const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;

    window.location.href = authUrl;
  }
}
