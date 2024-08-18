export interface Playlist {
  id: string;
  name: string;
  public: boolean;
  uri: string;
  tracks: {
    href: string;
    total: number;
    items: {
      added_at: string;
      added_by: string;
      track: Track
    }[];
  };
  owner: SpotifyUser;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  description: string | null;
}

export interface SpotifyUser {
  display_name: string;
  id: string;
  href: string;
}

export interface PlaylistResponse {
  items: Playlist[];
}

export interface Track {
  id: string;
  artists: Artist[];
  is_playable: boolean;
  name: string;
  uri: string;
}

export interface Artist {
  id: string;
  name: string;
  uri: string;
}
