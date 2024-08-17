export interface Playlist {
  id: string;
  name: string;
  public: boolean;
  uri: string;
  tracks: {
    href: string;
    total: number;
  };
  owner: SpotifyUser
}

export interface SpotifyUser {
  display_name: string;
  id: string;
  href: string;
}

export interface PlaylistResponse {
  items: Playlist[];
}
