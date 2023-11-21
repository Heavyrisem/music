import { Model } from '@music/types';
import { CoreEntity } from 'src/libs/database/core.entity';

export class User extends CoreEntity implements Model.UserInfo {
  provider: Model.Provider;
  providerId: string;
  name: string;
}
