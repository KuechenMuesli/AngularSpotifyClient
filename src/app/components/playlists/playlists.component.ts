import {Component, OnInit} from '@angular/core';
import {SpotifyApiService} from "../../services/spotify-api/spotify-api.service";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Playlist} from "../../types";
import {MatButtonModule} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-playlists',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    MatButtonModule,
    MatCard,
    MatCardContent,
    RouterLink,
    NgClass
  ],
  templateUrl: './playlists.component.html',
  styleUrl: './playlists.component.css'
})
export class PlaylistsComponent implements OnInit {
  playlists: Playlist[] | null = null;

  constructor(private spotifyApiService: SpotifyApiService) {
  }

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
