import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, Observable, switchMap} from 'rxjs';
import {Playlist, PlaylistResponse} from "../../types";

@Injectable({
  providedIn: 'root',
})
export class SpotifyApiService {
  private baseUrl = 'https://api.spotify.com/v1';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('spotifyToken');
    if (!token) {
      throw new Error('No Spotify token found');
    }

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getUserProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/me`, {
      headers: this.getHeaders(),
    });
  }

  getUserId(): Observable<string> {
    return this.getUserProfile().pipe(map(profileData => {
      return profileData.id;
    }))
  }

  getPlaylists(): Observable<Playlist[]> {
    return this.getUserId().pipe(switchMap(userId => {
      return this.http.get<PlaylistResponse>(`${this.baseUrl}/users/${userId}/playlists`, {
        headers: this.getHeaders(),
      }).pipe(map(data => {
        return data.items;
      }));
    }))
  }

  getPlaylist(playlistId: string): Observable<Playlist> {
    return this.http.get<Playlist>(`${this.baseUrl}/playlists/${playlistId}`, {
      headers: this.getHeaders(),
    });
  }
}
