import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private _logger: Logger,
  ) {
  }

  // async validateUser(username: string, pass: string): Promise<any> {
  //   const user = await this.usersService.findOne(username);
  //   if (user && user.password === pass) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    // TODO: Get hash pws and compare it
    if (user && user.password === pass) {
      const { password, ...result } = user;

      for (const queryKey of Object.keys(result)) {
        this._logger.debug(`${queryKey}: ${result[queryKey]}`);
      }
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payloadAccess = { username: user.username, sub: user.id };
    const payloadRefresh = { username: user.username, sub: user.id };
    return {
      'access_token': this.jwtService.sign(payloadAccess, { expiresIn: '1 days' }),
      'refresh_token': this.jwtService.sign(payloadRefresh, { expiresIn: '7 days' }),
    };
  }

}
