import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare const Spotify: any; // Declare Spotify as a global object

@Injectable({
  providedIn: 'root'
})
export class SpotifyPlayerService {

  private player: Spotify.Player | undefined;
  private deviceId: string | undefined;
  private token: string | null = null;
  private isPlayerReady = false;

  constructor(private http: HttpClient) {
    this.loadSpotifySDK();
  }

  private loadSpotifySDK(): void {
    // Define the global function expected by Spotify SDK
    (window as any).onSpotifyWebPlaybackSDKReady = () => {
      this.onSpotifyWebPlaybackSDKReady();
    };

    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.onload = () => {
      console.log('Spotify Web Playback SDK script loaded');
    };
    script.onerror = (error) => {
      console.error('Error loading Spotify Web Playback SDK script:', error);
    };
    document.head.appendChild(script);
  }

  private onSpotifyWebPlaybackSDKReady(): void {
    const token = localStorage.getItem('spotifyToken');
    if (token) {
      this.token = token;

      // Initialize the Spotify Player
      if (Spotify && Spotify.Player) {
        this.player = new Spotify.Player({
          name: 'Web Playback SDK Player',
          getOAuthToken: (cb: (token: string) => void) => {
            cb(this.token || '');
          },
          volume: 0.5
        });

        if (this.player) {
          this.player.connect().then((success: boolean) => {
            if (success) {
              console.log('The Web Playback SDK successfully connected to Spotify!');
            } else {
              console.error('Failed to connect to the Web Playback SDK.');
            }
          }).catch((error: any) => {
            console.error('Error connecting player:', error);
          });

          this.player.addListener('ready', ({ device_id }: { device_id: string }) => {
            this.deviceId = device_id;
            this.isPlayerReady = true;
            console.log('The Web Playback SDK is ready to play music!');
            console.log('Device ID', device_id);
          });

          this.player.addListener('not_ready', ({ device_id }: { device_id: string }) => {
            this.deviceId = device_id;
            this.isPlayerReady = false;
            console.log('The Web Playback SDK is not ready.');
            console.log('Device ID has gone offline', device_id);
          });

          this.player.addListener('player_state_changed', (state: any) => {
            console.log('Player state changed:', state);
          });
        }
      } else {
        console.error('Spotify object is not available.');
      }
    } else {
      console.error('No Spotify token found in localStorage.');
    }
  }

  public play(): void {
    if (this.player && this.isPlayerReady) {
      this.player.resume().then(() => {
        console.log('Playback resumed');
      }).catch((error: any) => {
        console.error('Error resuming playback:', error);
      });
    } else {
      console.error('Player is not ready. Please ensure the player is connected and ready.');
    }
  }

  public playTrack(trackUri: string): void {
    console.log("Device: " + this.deviceId);
    if (!this.deviceId || !this.isPlayerReady) {
      console.error('Player is not ready. Please ensure the player is connected and ready.');
      return;
    }

    const url = `https://api.spotify.com/v1/me/player/play?device_id=${this.deviceId}`;
    const body = {
      uris: [trackUri]
    };

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    this.http.put(url, body, { headers }).subscribe(
      response => console.log('Playing track:', trackUri),
      error => console.error('Error playing track:', error)
    );
  }

  public pause(): void {
    if (this.player && this.isPlayerReady) {
      this.player.pause().then(() => {
        console.log('Playback paused');
      }).catch((error: any) => {
        console.error('Error pausing playback:', error);
      });
    } else {
      console.error('Player is not ready. Please ensure the player is connected and ready.');
    }
  }

  public skipToNext(): void {
    if (this.deviceId && this.isPlayerReady) {
      const url = `https://api.spotify.com/v1/me/player/next?device_id=${this.deviceId}`;
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      });

      this.http.post(url, {}, { headers }).subscribe(
        response => console.log('Skipped to next track'),
        error => console.error('Error skipping to next track:', error)
      );
    } else {
      console.error('Player is not ready. Please ensure the player is connected and ready.');
    }
  }

  public skipToPrevious(): void {
    if (this.deviceId && this.isPlayerReady) {
      const url = `https://api.spotify.com/v1/me/player/previous?device_id=${this.deviceId}`;
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      });

      this.http.post(url, {}, { headers }).subscribe(
        response => console.log('Skipped to previous track'),
        error => console.error('Error skipping to previous track:', error)
      );
    } else {
      console.error('Player is not ready. Please ensure the player is connected and ready.');
    }
  }
}
