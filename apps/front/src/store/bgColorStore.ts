import { create } from 'zustand';

interface BgColorState {
  colors: string[];
  gradation: boolean;
  setColors: (colors: string[]) => void;
  setGradation: (gradation: boolean) => void;
}
export const useBgColorStore = create<BgColorState>((set) => ({
  colors: ['#E23E57', '#88304E', '#522546', '#311D3F'],
  gradation: false,
  setColors: (colors) => set({ colors }),
  setGradation: (gradation) => set({ gradation }),
}));
