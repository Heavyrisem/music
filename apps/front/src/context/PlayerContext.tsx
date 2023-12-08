import { Model } from '@music/types';
import { RP } from 'discord-rich-presence';
import React, { useCallback, useContext, useRef, useState } from 'react';
import tw from 'twin.macro';

import { getMusicData } from '@/api/music';
import useEffectOnce from '@/hooks/useEffectOnce';
import { initializeDiscordRPC } from '@/utils/rpc';

const SETTING_KEY = 'PLAYER_SETTING';
export interface PlayerContextState {
  musicInfo: Model.MusicInfo | null;
  paused: boolean;
  volume: number;
  progress: number;
  replay: 'none' | 'shuffle' | 'single';
  playList: Model.MusicInfo[] | null;
  setMusic: (musicInfo: PlayerContextState['musicInfo'], autoPlay?: boolean) => void;
  setPaused: (paused: PlayerContextState['paused']) => void;
  setVolume: (volume: PlayerContextState['volume']) => void;
  setProgress: (progress: PlayerContextState['progress']) => void;
  setReplay: (replay: PlayerContextState['replay']) => void;
  prependPlaylist: (musicInfo: Model.MusicInfo) => void;
  appendPlaylist: (musicInfo: Model.MusicInfo) => void;
  removePlaylist: (index: number) => void;
}

export const PlayerContext = React.createContext<PlayerContextState>({
  musicInfo: null,
  paused: false,
  volume: 0,
  progress: 0,
  replay: 'none',
  playList: null,
  setMusic: () => {},
  setPaused: () => {},
  setVolume: () => {},
  setReplay: () => {},
  setProgress: () => {},
  prependPlaylist: () => {},
  appendPlaylist: () => {},
  removePlaylist: () => {},
});

interface PlayerSetting {
  volume: number;
}

export const PlayerContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  // FIXME: Replace template to your actual client id.
  const CLINET_ID: string = 'YOUR_CLIENT_ID';
  const discordRPC: RP = initializeDiscordRPC(CLINET_ID);

  const [musicInfo, setMusicInfo] = useState<PlayerContextState['musicInfo']>(null);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0);
  const [replay, setReplay] = useState<PlayerContextState['replay']>('none');
  const [playList, setPlaylist] = useState<PlayerContextState['playList']>(null);

  const getSetting = useCallback(() => {
    const rawValue = localStorage.getItem(SETTING_KEY);
    if (!rawValue) return null;
    try {
      return JSON.parse(rawValue) as PlayerSetting;
    } catch (err) {
      return null;
    }
  }, []);

  const updateSetting = useCallback(
    (setting: Partial<PlayerSetting>) => {
      const originSetting = getSetting() ?? ({} as Partial<PlayerSetting>);

      const mergedSetting = Object.entries(setting).reduce((acc, [key, value]) => {
        acc[key as keyof PlayerSetting] = value;
        return acc;
      }, originSetting);

      localStorage.setItem(SETTING_KEY, JSON.stringify(mergedSetting));
    },
    [getSetting],
  );

  const handleSetMusic = useCallback<PlayerContextState['setMusic']>(
    async (musicInfo, autoPlay = true) => {
      setMusicInfo(musicInfo);
      setProgress(0);

      if (!musicInfo) return;
      getMusicData({ id: musicInfo.id }).then((data) => {
        const src = URL.createObjectURL(new Blob([data]));
        if (!audioRef.current) return;

        audioRef.current.src = src;
        if (autoPlay) audioRef.current.play();
        //   if (autoPlay) {
        //       audioRef.current.addEventListener('onloa')
        //   }
      });
    },
    [],
  );

  const handleSetPaused = useCallback<PlayerContextState['setPaused']>(
    (paused) => {
      if (!audioRef.current) return;

      if (paused) audioRef.current.pause();
      else if (musicInfo) audioRef.current.play();
      setPaused(paused);
    },
    [musicInfo],
  );

  const handleSetVolume = useCallback<PlayerContextState['setVolume']>(
    (volume) => {
      if (!audioRef.current) return;

      audioRef.current.volume = volume * 0.01;
      setVolume(volume);
      updateSetting({ volume });
    },
    [updateSetting],
  );

  const handleSetProgress = useCallback<PlayerContextState['setProgress']>((progress) => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = progress;
    setProgress(progress);
  }, []);

  const handlePrependPlaylist = useCallback<PlayerContextState['prependPlaylist']>(
    (music) => {},
    [],
  );
  const handleAppendPlaylist = useCallback<PlayerContextState['appendPlaylist']>((music) => {}, []);
  const handleRemovePlaylist = useCallback<PlayerContextState['removePlaylist']>((music) => {}, []);

  const handleUpdateAudioTime = useCallback(() => {
    if (!audioRef.current) return;

    setProgress(audioRef.current.currentTime);
  }, []);

  const handleMusicEnd = useCallback(() => {
    handleSetMusic(null);
    handleSetPaused(true);
  }, [handleSetMusic, handleSetPaused]);

  useEffectOnce(() => {
    const playerSetting = getSetting();
    try {
      if (!playerSetting) throw Error();

      if (playerSetting.volume) handleSetVolume(playerSetting.volume);
    } catch (e) {
      localStorage.removeItem(SETTING_KEY);
      console.error(e);
    }
  });

  return (
    <PlayerContext.Provider
      value={{
        musicInfo,
        paused,
        volume,
        replay,
        playList,
        progress,
        setReplay,
        setMusic: handleSetMusic,
        setPaused: handleSetPaused,
        setVolume: handleSetVolume,
        setProgress: handleSetProgress,
        prependPlaylist: handlePrependPlaylist,
        appendPlaylist: handleAppendPlaylist,
        removePlaylist: handleRemovePlaylist,
      }}
    >
      {children}
      <audio
        ref={audioRef}
        css={[tw`invisible`]}
        autoPlay={false}
        loop={false}
        onTimeUpdate={handleUpdateAudioTime}
        onEnded={handleMusicEnd}
      />
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (!context) throw Error();

  return context;
};
