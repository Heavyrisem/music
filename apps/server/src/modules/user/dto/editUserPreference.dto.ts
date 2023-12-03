import { UserService } from '@music/types';
import { IsOptional, IsString } from 'class-validator';

export class EditUserPreferenceBodyDto implements UserService.EditUserPreferenceRequest {
  @IsString()
  @IsOptional()
  displayName?: string;
}
