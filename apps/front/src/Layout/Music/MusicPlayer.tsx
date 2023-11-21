import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import tw from 'twin.macro';

import { PlayController } from '@/components/organisms/PlayController';
import { SliderInput } from '@/components/organisms/SliderInput';
import { MusicIcon } from '@/icons/MusicIcon';
import { usePlayerStore } from '@/store/playerStore';

export const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { playing, volume, setProgress, setVolume, setPaused, setPlaying } = usePlayerStore();

  useEffect(() => {
    const { current: audio } = audioRef;
    if (!audio || !playing) return;

    if (audio.src !== playing.audioData.source) audio.src = playing.audioData.source;
  }, [playing, playing?.audioData.source]);

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
    <div css={[tw`flex justify-between items-center gap-[8rem]`]}>
      <audio
        ref={audioRef}
        css={[tw`invisible`]}
        autoPlay={false}
        loop={false}
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
            <Image src={playing.audioData.thumbnailURL} alt="" width={48} height={48} />
            <div css={[tw`flex flex-col flex-1 items-center justify-between pt-1`, tw`text-xs`]}>
              <div>{playing.audioData.title}</div>
              <div>
                {playing.audioData.artist} - {playing.audioData.album}
              </div>
              <SliderInput
                css={[tw`mb-0`]}
                value={playing.progress}
                onChange={handlePlayerProgressChange}
                min={0}
                max={playing.audioData.duration}
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
