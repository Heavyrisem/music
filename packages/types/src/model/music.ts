export interface MusicInfo {
  id: number;
  youtubeId: string;
  title: string;
  artist: string[];
  album: string;
  thumbnailUrl: string;
  duration: number;
  isExplicit: boolean;
}

export interface MusicInfoWithoutId extends Omit<MusicInfo, "id"> {}
