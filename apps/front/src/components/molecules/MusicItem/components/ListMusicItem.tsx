import React from 'react';

interface ListMusicItemProps {
  thumbnailImageUrl: string;
  title: string;
  album: string;
  author: string;
  duration: number;
}

export const ListMusicItem: React.FC<ListMusicItemProps> = () => {
  return <div></div>;
};
