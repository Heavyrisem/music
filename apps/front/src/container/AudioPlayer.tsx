import React, { PropsWithChildren, useCallback, useEffect, useRef } from 'react';
import tw from 'twin.macro';

import { usePlayerStore } from '@/store/playerStore';

interface AudioPlayerProps extends PropsWithChildren {}

// TODO: React Context 로 변경하여 usePlayer() 로 핸들러 함수를 가져다 사용하는 방식으로 리팩토링
export const AudioPlayer: React.FC<AudioPlayerProps> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { playing, volume, setProgress, setPaused, setPlaying } = usePlayerStore();

  useEffect(() => {
    const { current: audio } = audioRef;
    if (!audio) return;

    console.log(volume * 0.01);
    audio.volume = volume * 0.01;
  }, [volume]);

  useEffect(() => {
    const { current: audio } = audioRef;
    if (!audio || !playing) return;

    if (audio.src !== playing.audioData.source) audio.src = playing.audioData.source;
  }, [playing, playing?.audioData.source]);

  useEffect(() => {
    const { current: audio } = audioRef;
    if (!audio || !playing) return;

    if (playing.paused && !audio.paused) audio.pause();
    if (!playing.paused && audio.paused && audio.currentTime < audio.duration) audio.play();
  }, [playing, playing?.paused]);

  useEffect(() => {
    const { current: audio } = audioRef;
    if (!audio || !playing) return;

    if (Math.abs(audio.currentTime - playing.progress) > 2) audio.currentTime = playing.progress;
  }, [playing, playing?.progress]);

  const handleChangeDuration = useCallback<React.ReactEventHandler<HTMLAudioElement>>(
    (e) => {
      const { current: audio } = audioRef;
      if (!audio || !playing) return;

      setProgress(audio.currentTime);
    },
    [playing, setProgress],
  );

  const handlePlayEnd = useCallback(() => {
    const { current: audio } = audioRef;
    if (!audio) return;

    audio.pause();
    setPlaying({
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
      progress: 0,
    });
  }, [setPlaying]);

  return (
    <>
      <audio
        ref={audioRef}
        css={[tw`invisible`]}
        autoPlay={false}
        loop={false}
        onTimeUpdateCapture={handleChangeDuration}
        onEnded={handlePlayEnd}
      />
      {children}
    </>
  );
};
