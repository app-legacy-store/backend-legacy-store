import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
// import { GetUser } from './decorators/get-user.decorator';
import { Auth } from './decorators/auth.decorator';
import { ValidRoles } from './interfaces/valid-roles.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  
  @Get()
  async findAll(): Promise<User[]> {
    return await this.authService.getAllUser();
  }

  @Get('user/:id')
  async findOneUser(@Param('id') id: string) {
    return this.authService.findOneUser(id);
  }

  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.create(createUserDto);
  }

  @Post('login')
    async loginUser(@Body() loginUserDto: LoginUserDto): Promise<User> {
    return await this.authService.login(loginUserDto);
  }

  // @Get('private')
  // @Auth( ValidRoles.admin ) 
  // privateRoute(
  //   @GetUser() user: User
  // ){
    
  //   return {
  //     ok: true,
  //     message: user,
  //   }
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  @Delete(':id')
  @Auth( ValidRoles.admin )
  remove(@Param('id') id: string) {
    return this.authService.removeUser(id);
  }
}
