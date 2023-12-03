import { Body, Controller, Put, UseGuards } from '@nestjs/common';

import { BaseResponse } from 'src/libs/common/dto/response.dto';

import { GetUser } from '../auth/decorator/get-user.decorator';
import { LoggedInGuard } from '../auth/guard/logged-in.guard';
import { EditUserPreferenceBodyDto } from './dto/editUserPreference.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put()
  @UseGuards(LoggedInGuard)
  async editUserPreference(
    @Body() editUserPreference: EditUserPreferenceBodyDto,
    @GetUser() user: User,
  ) {
    const data = await this.userService.updateUser({ id: user.id, ...editUserPreference });
    return BaseResponse.of(data);
  }
}
