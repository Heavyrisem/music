import { create } from 'zustand';

// TODO: music base interface 병합
export interface AudioData {
  id: string;
  title: string;
  album: string;
  artist: string;
  source: string;
  duration: number;
  thumbnailURL: string;
}

interface PlayerStore {
  playing: AudioData | null;
  progress: number;
  replay: 'none' | 'shuffle' | 'single';
  playList: AudioData[];
  setPlaying: (playing: AudioData | null) => void;
  setProgress: (progress: number) => void;
  prependPlaylist: (audioData: AudioData) => void;
  appendPlaylist: (audioData: AudioData) => void;
  removePlaylist: (index: number) => void;
}
export const usePlayerStore = create<PlayerStore>((set) => ({
  playing: {
    id: 'asdfasdf',
    title: 'rome',
    album: '사랑.zip EP',
    artist: '볼빨간사춘기',
    source: '',
    duration: 244,
    thumbnailURL:
      'https://lh3.googleusercontent.com/bm0WFPaXBYSnv9g0qNffrErNV8yn_9dkRneuKEjynUUjy9giC6E6zZZ7Op4jWLGDlkHRCk5M68aWlLp9=w60-h60-l90-rj',
  },
  progress: 0,
  replay: 'none',
  playList: [],
  setPlaying: (playing) => set({ playing }),
  setProgress: (progress) => set({ progress }),
  prependPlaylist: (audioData) =>
    set((prev) => ({ ...prev, playList: [audioData, ...prev.playList] })),
  appendPlaylist: (audioData) =>
    set((prev) => ({ ...prev, playList: [...prev.playList, audioData] })),
  removePlaylist: (index) =>
    set((prev) => {
      if (!prev.playList.at(index)) return prev;
      return { ...prev, playList: prev.playList.filter((_, i) => i !== index) };
    }),
}));
