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

interface playingState {
  paused: boolean;
  audioData: AudioData;
  progress: number;
}

interface PlayerStore {
  playing: playingState | null;
  volume: number;
  replay: 'none' | 'shuffle' | 'single';
  playList: AudioData[];
  setProgress: (progress: number) => void;
  setVolume: (volume: number) => void;
  setPlaying: (playing: PlayerStore['playing']) => void;
  setPaused: (paused: boolean) => void;
  prependPlaylist: (audioData: AudioData) => void;
  appendPlaylist: (audioData: AudioData) => void;
  removePlaylist: (index: number) => void;
}
export const usePlayerStore = create<PlayerStore>((set) => ({
  playing: {
    paused: true,
    audioData: {
      id: 'asdfasdf',
      title: 'rome',
      album: '사랑.zip EP',
      artist: '볼빨간사춘기',
      source: 'http://localhost:3000/rome.mp3',
      duration: 120 + 44,
      thumbnailURL:
        'https://lh3.googleusercontent.com/bm0WFPaXBYSnv9g0qNffrErNV8yn_9dkRneuKEjynUUjy9giC6E6zZZ7Op4jWLGDlkHRCk5M68aWlLp9=w60-h60-l90-rj',
    },
    progress: 50,
  },
  volume: 5,
  replay: 'none',
  playList: [],
  setProgress: (progress) =>
    set((prev) => {
      if (!prev.playing || prev.playing.progress === progress) return prev;
      return {
        playing: {
          ...prev.playing,
          progress,
        },
      };
    }),
  setVolume: (volume) => set({ volume }),
  setPlaying: (playing) => set({ playing }),
  setPaused: (paused) =>
    set((prev) => {
      if (!prev.playing || prev.playing.paused === paused) return prev;
      return {
        playing: {
          ...prev.playing,
          paused,
        },
      };
    }),
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
