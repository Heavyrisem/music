import { Model } from '@music/types';
import { CoreEntity } from 'src/libs/database/core.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity()
export class MusicMeta extends CoreEntity implements Model.MusicInfo {
  @Index({ unique: true })
  @Column({ nullable: false })
  youtubeId: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false, type: 'json' })
  artist: string[];

  @Column({ nullable: false })
  album: string;

  @Column({ nullable: false })
  thumbnailUrl: string;

  @Column({ nullable: false })
  duration: number;

  @Column({ nullable: false })
  isExplicit: boolean;

  public update(musicInfo: Model.MusicInfoWithoutId) {
    this.youtubeId = musicInfo.youtubeId;
    this.title = musicInfo.title;
    this.artist = musicInfo.artist;
    this.album = musicInfo.album;
    this.thumbnailUrl = musicInfo.thumbnailUrl;
    this.duration = musicInfo.duration;
    this.isExplicit = musicInfo.isExplicit;
  }
}
