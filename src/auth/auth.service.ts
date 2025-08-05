import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async signUp(data: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await this.prisma.user.findFirst({
            where: { email: data.email }
        })

        if (user?.email === data.email) {
            throw new ConflictException("User already exists with this email")
        }

        return this.prisma.user.create({
            data: {
                ...data,
                password: hashedPassword
            }
        })
    }

    async signIn(email: string, pass: string) {
        const user = await this.prisma.user.findFirstOrThrow({
            where: {
                email,
            }
        });

        if (user.password !== pass) {
            throw new UnauthorizedException()
        }

        const payload = { sub: user.id, name: user.name }
        const access_token = await this.jwtService.signAsync(payload)

        return { access_token }

    }

}
