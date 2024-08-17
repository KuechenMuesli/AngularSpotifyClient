import {Component, OnInit} from '@angular/core';
import {Playlist} from "../../types";
import {ActivatedRoute} from "@angular/router";
import {of, switchMap} from "rxjs";
import {SpotifyApiService} from "../../services/spotify-api/spotify-api.service";
import {NgForOf, NgIf} from "@angular/common";
import {MatCard, MatCardContent} from "@angular/material/card";

@Component({
  selector: 'app-playlist-details',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    MatCard,
    MatCardContent
  ],
  templateUrl: './playlist-details.component.html',
  styleUrl: './playlist-details.component.css'
})
export class PlaylistDetailsComponent implements OnInit {
  playlist: Playlist | null = null;

  constructor(private route: ActivatedRoute, private spotifyApiService: SpotifyApiService) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(switchMap(params => {
      let playlistId = params.get('playlistId');
      if (playlistId) {
        return this.spotifyApiService.getPlaylist(playlistId);
      }
      return of();
    })).subscribe({
      next: playlist => {
        console.log(playlist.tracks.items)
        this.playlist = playlist;
      }
    });
  }
}
