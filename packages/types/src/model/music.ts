export interface PlaylistInfo {
  id: number;
  name: string;
}

export interface PlaylistDetail extends PlaylistInfo {
  description: string;
  coverImageUrl: string;
  musicList: MusicInfo[];
  author: string;
}

export interface MusicInfo {
  title: string;
  artist: string;
  album: string;
  thumbnailUrl: string;
  duration: number;
}
