import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import tw from 'twin.macro';

import { PlayController } from '@/components/organisms/PlayController';
import { SliderInput } from '@/components/organisms/SliderInput';
import { useMusicData } from '@/hooks/api/useMusicData';
import { MusicIcon } from '@/icons/MusicIcon';
import { usePlayerStore } from '@/store/playerStore';

export const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { playing, volume, setProgress, setVolume, setPaused, setPlaying } = usePlayerStore();
  const { data: source } = useMusicData(playing?.musicInfo.id);

  // useEffect(() => {
  //   const { current: audio } = audioRef;
  //   if (!audio || !playing) return;

  // if (audio.src !== playing.musicInfo.source) audio.src = playing.musicInfo.source;
  // }, [playing, playing?.musicInfo.source]);

  useEffect(() => {
    const { current: audio } = audioRef;
    if (!audio) return;

    audio.volume = volume * 0.01;
  }, [volume]);

  const handlePlayStateChange = useCallback(
    (playing: boolean) => {
      const { current: audio } = audioRef;
      if (!audio) return;

      if (playing) audio.play();
      else audio.pause();
      setPaused(!playing);
    },
    [setPaused],
  );

  const handlePlayerProgressChange = useCallback((progress: number) => {
    const { current: audio } = audioRef;
    if (!audio) return;

    audio.currentTime = progress;
  }, []);

  const handleChangeTime = useCallback<React.ReactEventHandler<HTMLAudioElement>>(() => {
    const { current: audio } = audioRef;
    if (!audio) return;

    setProgress(audio.currentTime);
  }, [setProgress]);

  const handlePlayEnd = useCallback(() => {
    const { current: audio } = audioRef;
    if (!audio) return;

    audio.pause();
    setPlaying({
      paused: true,
      musicInfo: {
        id: 78,
        youtubeId: '',
        isExplicit: false,
        title: 'rome',
        album: '사랑.zip EP',
        artist: ['볼빨간사춘기'],
        duration: 120 + 44,
        thumbnailUrl:
          'https://lh3.googleusercontent.com/bm0WFPaXBYSnv9g0qNffrErNV8yn_9dkRneuKEjynUUjy9giC6E6zZZ7Op4jWLGDlkHRCk5M68aWlLp9=w60-h60-l90-rj',
      },
      progress: 0,
    });
  }, [setPlaying]);

  return (
    <div css={[tw`flex justify-between items-center gap-[8rem]`]}>
      <audio
        ref={audioRef}
        css={[tw`invisible`]}
        autoPlay={false}
        loop={false}
        src={source}
        onTimeUpdateCapture={handleChangeTime}
        onEnded={handlePlayEnd}
      />
      <PlayController
        css={[tw`w-24`]}
        playing={!playing?.paused}
        onStateChange={handlePlayStateChange}
      />
      <div css={[tw`w-[34rem] h-[3rem] bg-gray-200 bg-opacity-10 overflow-hidden`, tw`rounded-md`]}>
        {!playing && (
          <div css={[tw`w-full h-full flex justify-center items-center`]}>
            <MusicIcon css={[tw`w-8 h-8 fill-gray-200 opacity-75`]} />
          </div>
        )}
        {playing && (
          <div css={[tw`w-full h-full flex`]}>
            <Image src={playing.musicInfo.thumbnailUrl} alt="" width={48} height={48} />
            <div css={[tw`flex flex-col flex-1 items-center justify-between pt-1`, tw`text-xs`]}>
              <div>{playing.musicInfo.title}</div>
              <div>
                {playing.musicInfo.artist} - {playing.musicInfo.album}
              </div>
              <SliderInput
                css={[tw`mb-0`]}
                value={playing.progress}
                onChange={handlePlayerProgressChange}
                min={0}
                max={playing.musicInfo.duration}
                debounceDelayMils={10}
              />
            </div>
          </div>
        )}
      </div>
      <div css={[tw`w-24 flex items-center`]}>
        <SliderInput
          value={volume}
          onChange={setVolume}
          min={0}
          max={100}
          cursorType="circle"
          showCursor
        />
      </div>
    </div>
  );
};
