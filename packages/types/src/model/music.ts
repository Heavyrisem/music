export interface Playlist {
  id: number;
  name: string;
}

export interface MusicSearchResult {
  title: string;
  artist: string;
  album: string;
  thumbnailUrl: string;
  duration: number;
}
