import { Model, MusicService } from '@music/types';

const thumbnailUrl =
  'https://lh3.googleusercontent.com/bm0WFPaXBYSnv9g0qNffrErNV8yn_9dkRneuKEjynUUjy9giC6E6zZZ7Op4jWLGDlkHRCk5M68aWlLp9=w60-h60-l90-rj';
export const getSearchMusic = async (q: string) => {
  const mockData: Model.MusicInfo[] = [
    { title: '제목-1', artist: '가수', album: '앨범', thumbnailUrl, duration: 120 + 44 },
    { title: '제목-2', artist: '가수', album: '앨범', thumbnailUrl, duration: 120 + 44 },
    { title: '제목-3', artist: '가수', album: '앨범', thumbnailUrl, duration: 120 + 44 },
    { title: '제목-4', artist: '가수', album: '앨범', thumbnailUrl, duration: 120 + 44 },
    { title: '제목-5', artist: '가수', album: '앨범', thumbnailUrl, duration: 120 + 44 },
    { title: '제목-6', artist: '가수', album: '앨범', thumbnailUrl, duration: 120 + 44 },
    { title: '제목-7', artist: '가수', album: '앨범', thumbnailUrl, duration: 120 + 44 },
    { title: '제목-8', artist: '가수', album: '앨범', thumbnailUrl, duration: 120 + 44 },
    { title: '제목-9', artist: '가수', album: '앨범', thumbnailUrl, duration: 120 + 44 },
    { title: '제목-10', artist: '가수', album: '앨범', thumbnailUrl, duration: 120 + 44 },
    { title: '제목-11', artist: '가수', album: '앨범', thumbnailUrl, duration: 120 + 44 },
    { title: '제목-12', artist: '가수', album: '앨범', thumbnailUrl, duration: 120 + 44 },
    { title: '제목-13', artist: '가수', album: '앨범', thumbnailUrl, duration: 120 + 44 },
    { title: '제목-14', artist: '가수', album: '앨범', thumbnailUrl, duration: 120 + 44 },
    { title: '제목-15', artist: '가수', album: '앨범', thumbnailUrl, duration: 120 + 44 },
  ];
  return mockData;
};

export const getUserPlaylist = async (): Promise<Model.PlaylistInfo[]> => {
  return new Promise((resolve) => {
    const mockData: Model.PlaylistInfo[] = [
      {
        id: 1,
        name: 'Forza Horizon Pulse',
      },
      {
        id: 2,
        name: 'Forza Horizon 4',
      },
    ];
    setTimeout(() => {
      resolve(mockData);
    }, 1000);
  });
};

export const getPlaylistDetail = async (id: number): Promise<Model.PlaylistDetail> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: 'Forza Horizon Pulse',
        musicList: [
          { title: '제목-1', artist: '가수', album: '앨범', thumbnailUrl, duration: 120 + 44 },
        ],
        coverImageUrl: '/fh5.jpg',
        author: 'Heavyrisem',
        description: '🏁',
      });
    }, 1000);
  });
};

export const updatePlaylistDetail = async (
  playlistDetail: MusicService.UpdatePlaylistDetailRequest,
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('update PlaylistDetail', playlistDetail);
      resolve(undefined);
    }, 1000);
  });
};
