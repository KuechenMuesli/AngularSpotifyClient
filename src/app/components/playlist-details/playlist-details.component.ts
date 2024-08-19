import {Component, OnInit} from '@angular/core';
import {Playlist} from "../../types";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {of, switchMap} from "rxjs";
import {SpotifyApiService} from "../../services/spotify-api/spotify-api.service";
import {NgForOf, NgIf} from "@angular/common";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {SpotifyPlayerService} from "../../services/spotify-player/spotify-player.service";
import {MatRipple} from "@angular/material/core";

@Component({
  selector: 'app-playlist-details',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatRipple,
    RouterLink
  ],
  templateUrl: './playlist-details.component.html',
  styleUrl: './playlist-details.component.scss'
})
export class PlaylistDetailsComponent implements OnInit {
  playlist: Playlist | null = null;

  constructor(private route: ActivatedRoute, private spotifyApiService: SpotifyApiService,
              private spotifyPlayerService: SpotifyPlayerService) {
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
        this.playlist = playlist;
        this.spotifyApiService.selectedPlaylist.next(playlist.id);
      }
    });
  }

  playTrack(uri: string) {
    this.spotifyPlayerService.playTrack(uri);
  }
}
