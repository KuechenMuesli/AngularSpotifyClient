import {Component, OnInit} from '@angular/core';
import {Playlist} from "../../types";
import {SpotifyApiService} from "../../services/spotify-api/spotify-api.service";
import {ActivatedRoute, NavigationEnd, Router, RouterLink} from "@angular/router";
import {MatCard, MatCardContent} from "@angular/material/card";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {map, of, Subscription, switchMap} from "rxjs";

@Component({
  selector: 'app-sidenav-playlists',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    NgForOf,
    NgIf,
    RouterLink,
    NgClass
  ],
  templateUrl: './sidenav-playlists.component.html',
  styleUrl: './sidenav-playlists.component.scss'
})
export class SidenavPlaylistsComponent implements OnInit {
  playlists: Playlist[] | null = null;
  currentPlaylistId: string | null = null;
  subscriptions: Subscription = new Subscription();

  constructor(private spotifyApiService: SpotifyApiService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.subscriptions.add(
      this.spotifyApiService.getPlaylists()
        .subscribe(
          data => {
            this.playlists = data;
          },
          (error: any) => {
            console.error('Error fetching user profile:', error);
          }
        )
    );

    this.subscriptions.add(
      this.spotifyApiService.selectedPlaylist.subscribe({
        next: playlistId => this.currentPlaylistId = playlistId
      })
    );
  }
}
