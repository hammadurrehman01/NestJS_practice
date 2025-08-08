import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from './auth.guard';

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
    async signIn(@Body() body: { email: string, password: string }) {
        const signinUser = await this.authService.signIn(body.email, body.password)
        if (signinUser) return {
            message: "Logged in successfully",
            access_token: signinUser.access_token
        }
    }

    @UseGuards(AuthGuard)
    @Get('/profile')
    getProfile(@Request() req) {
        return req.user
    }

}
