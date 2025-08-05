import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    async create(@Body() createUserDto: CreateUserDto) {
        const createdUser = await this.authService.signUp(createUserDto)

        if (createdUser) {
            return { message: "User created successfully" }
        }
    }

    @Post('/signin')
    async signIn(@Body() email: string, password: string) {
        const signinUser = await this.authService.signIn(email, password)
        if (signinUser) return {
            message: "Logged in successfully",
            access_token: signinUser.access_token
        }
    }

}
