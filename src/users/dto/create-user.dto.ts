export class CreateUserDto {
    username: string;
    email: string;
    password: string;
}

export class SigninUserDto {
    email: string;
    password: string;
}
