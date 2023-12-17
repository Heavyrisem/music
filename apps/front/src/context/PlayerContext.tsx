import { Model } from '@music/types';
import React, { useCallback, useContext, useRef, useState } from 'react';
import tw from 'twin.macro';

import { getMusicData } from '@/api/music';
import { savePlayHistory } from '@/api/playHistory';
import useEffectOnce from '@/hooks/useEffectOnce';

const SETTING_KEY = 'PLAYER_SETTING';

const generateQueueID = () => Math.floor(Math.random() * 1000000000).toString(16);

export interface QueuedMusicInfo extends Model.MusicInfo {
  queueID: string;
}

export interface PlayerContextState {
  musicInfo: QueuedMusicInfo | null;
  paused: boolean;
  volume: number;
  progress: number;
  playType: 'none' | 'shuffle' | 'single' | 'loop';
  queue: QueuedMusicInfo[];
  setMusic: (musicInfo: Model.MusicInfo | null, autoPlay?: boolean) => void;
  setPaused: (paused: PlayerContextState['paused']) => void;
  setVolume: (volume: PlayerContextState['volume']) => void;
  setProgress: (progress: PlayerContextState['progress']) => void;
  setPlayType: (replay: PlayerContextState['playType']) => void;
  prependQueue: (musicInfo: Model.MusicInfo[]) => void;
  appendQueue: (musicInfo: Model.MusicInfo[]) => void;
  removeFromQueue: (queueIDs: string[]) => void;
  clearQueue: () => void;
  skipMusic: (playQueueID?: string) => void;
}

export const PlayerContext = React.createContext<PlayerContextState>({
  musicInfo: null,
  paused: false,
  volume: 0,
  progress: 0,
  playType: 'none',
  queue: [],
  setMusic: () => {},
  setPaused: () => {},
  setVolume: () => {},
  setPlayType: () => {},
  setProgress: () => {},
  prependQueue: () => {},
  appendQueue: () => {},
  removeFromQueue: () => {},
  clearQueue: () => {},
  skipMusic: () => {},
});

interface PlayerSetting {
  volume: number;
}

export const PlayerContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [musicInfo, setMusicInfo] = useState<PlayerContextState['musicInfo']>(null);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0);
  const [playType, setPlayType] = useState<PlayerContextState['playType']>('none');
  const [originQueue, setOriginQueue] = useState<PlayerContextState['queue']>([]);
  const [queue, setQueue] = useState<PlayerContextState['queue']>([]);

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
      setMusicInfo(musicInfo ? { ...musicInfo, queueID: generateQueueID() } : musicInfo);
      setProgress(0);

      if (!musicInfo) return;
      getMusicData({ id: musicInfo.id }).then((data) => {
        const src = URL.createObjectURL(new Blob([data]));
        if (!audioRef.current) return;

        audioRef.current.src = src;
        savePlayHistory({ id: musicInfo.id }).catch();
        if (autoPlay) {
          setPaused(false);
          audioRef.current.play();
        }
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

  const handlePrependQueue = useCallback<PlayerContextState['prependQueue']>(
    (musics) => {
      const [first, ...rest] = musics;

      if (musicInfo) {
        setOriginQueue((prev) => [
          ...musics.map((music) => ({ ...music, queueID: generateQueueID() })),
          ...prev,
        ]);
        setQueue((prev) => [
          ...musics.map((music) => ({ ...music, queueID: generateQueueID() })),
          ...prev,
        ]);
      } else {
        setOriginQueue((prev) => [
          ...rest.map((music) => ({ ...music, queueID: generateQueueID() })),
          ...prev,
        ]);
        setQueue((prev) => [
          ...rest.map((music) => ({ ...music, queueID: generateQueueID() })),
          ...prev,
        ]);
        handleSetMusic(first);
      }
    },
    [handleSetMusic, musicInfo],
  );

  const handleAppendQueue = useCallback<PlayerContextState['appendQueue']>(
    (musics) => {
      const [first, ...rest] = musics;

      if (musicInfo) {
        setOriginQueue((prev) => [
          ...prev,
          ...musics.map((music) => ({ ...music, queueID: generateQueueID() })),
        ]);
        setQueue((prev) => [
          ...prev,
          ...musics.map((music) => ({ ...music, queueID: generateQueueID() })),
        ]);
      } else {
        setOriginQueue((prev) => [
          ...prev,
          ...rest.map((music) => ({ ...music, queueID: generateQueueID() })),
        ]);
        setQueue((prev) => [
          ...prev,
          ...rest.map((music) => ({ ...music, queueID: generateQueueID() })),
        ]);
        handleSetMusic(first);
      }
    },
    [handleSetMusic, musicInfo],
  );

  const handleRemoveFromQueue = useCallback<PlayerContextState['removeFromQueue']>(
    (deleteQueueIDs) => {
      setQueue((prev) => prev.filter(({ queueID }) => !deleteQueueIDs.includes(queueID)));
      setOriginQueue((prev) => prev.filter(({ queueID }) => !deleteQueueIDs.includes(queueID)));
    },
    [],
  );

  const handleClearQueue = useCallback<PlayerContextState['clearQueue']>(() => {
    setQueue([]);
    setOriginQueue([]);
  }, []);

  const handleUpdateAudioTime = useCallback(() => {
    if (!audioRef.current) return;

    setProgress(audioRef.current.currentTime);
  }, []);

  const handleMusicEnd = useCallback(() => {
    const nextMusic = queue.at(0);
    if (!nextMusic) {
      handleSetMusic(null);
      handleSetPaused(true);
      return;
    }

    switch (playType) {
      case 'none':
        if (!nextMusic) {
          handleSetMusic(null);
          handleSetPaused(true);
          return;
        }
        setQueue((prev) => prev.filter(({ queueID }) => queueID !== nextMusic.queueID));
        setOriginQueue((prev) => prev.filter(({ queueID }) => queueID !== nextMusic.queueID));
        handleSetMusic(nextMusic);
        return;
      case 'loop':
        if (!nextMusic) {
          setQueue(originQueue);
          const originNextMusic = originQueue.at(0);
          if (!originNextMusic) {
            handleSetMusic(null);
            handleSetPaused(true);
            return;
          }
          handleSetMusic(originNextMusic);
          return;
        }
        setQueue((prev) => prev.filter(({ queueID }) => queueID !== nextMusic.queueID));
        return;
      case 'single':
        if (!nextMusic) {
          handleSetMusic(null);
          handleSetPaused(true);
          return;
        }
        handleSetMusic(nextMusic);
    }
  }, [handleSetMusic, handleSetPaused, originQueue, playType, queue]);

  const handleSetPlayType = useCallback<PlayerContextState['setPlayType']>(
    (type) => {
      switch (type) {
        case 'none':
        case 'loop':
        case 'single':
          setQueue(originQueue);
          break;
        case 'shuffle':
          setQueue(originQueue.sort(() => Math.random() - 0.5));
      }

      setPlayType(type);
    },
    [originQueue],
  );

  const handleSkipMusic = useCallback<PlayerContextState['skipMusic']>(
    (playQueueID) => {
      if (playQueueID) {
        const index = queue.findIndex(({ queueID }) => queueID === playQueueID) ?? 0;
        const newQueue = queue.slice(index);

        const nextMusic = newQueue.at(0);
        if (nextMusic) {
          handleSetMusic(nextMusic);
          setQueue(newQueue);
        }
      } else {
        handleMusicEnd();
      }
    },
    [handleMusicEnd, handleSetMusic, queue],
  );

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
        playType,
        queue,
        progress,
        setPlayType: handleSetPlayType,
        setMusic: handleSetMusic,
        setPaused: handleSetPaused,
        setVolume: handleSetVolume,
        setProgress: handleSetProgress,
        prependQueue: handlePrependQueue,
        appendQueue: handleAppendQueue,
        removeFromQueue: handleRemoveFromQueue,
        clearQueue: handleClearQueue,
        skipMusic: handleSkipMusic,
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
