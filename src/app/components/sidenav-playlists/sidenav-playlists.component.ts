import {Component, OnInit} from '@angular/core';
import {Playlist} from "../../types";
import {SpotifyApiService} from "../../services/spotify-api/spotify-api.service";
import {Router, RouterLink} from "@angular/router";
import {MatCard, MatCardContent} from "@angular/material/card";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-sidenav-playlists',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './sidenav-playlists.component.html',
  styleUrl: './sidenav-playlists.component.css'
})
export class SidenavPlaylistsComponent implements OnInit {
  playlists: Playlist[] | null = null;

  constructor(private spotifyApiService: SpotifyApiService) {}

  ngOnInit() {
    this.spotifyApiService.getPlaylists()
      .subscribe(
        data => {
          this.playlists = data;
          console.log(data);
        },
        (error: any) => {
          console.error('Error fetching user profile:', error);
        }
      );
  }
}
