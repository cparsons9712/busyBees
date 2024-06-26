import { IsEmail, IsNotEmpty, IsUrl, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  @Length(5, 255, {
    message: 'Password must be at least 5 characters long',
  })
  @Matches(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,})/, {
    message:
      'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  password: string;

  @IsUrl()
  @Matches(/.(jpg|jpeg|png|gif)$/i, {
    message:
      'URL must be a valid image URL ending with .jpg, .jpeg, .png, or .gif',
  })
  profilePicUrl: string;
}
