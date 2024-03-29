import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import IsAfter from './IsAfter';

export class CreateBlockDto {
  @IsInt({ message: 'User id must be a valid number' })
  @IsNotEmpty({ message: 'User id is required' })
  userId: number;

  @IsString({ message: 'Title must be a string data type' })
  @IsNotEmpty({ message: 'Title is required' })
  @Length(3, 100, {
    message: 'Title must be between 3 and 100 characters long',
  })
  title: string;

  @IsNotEmpty({ message: 'Start Time is required' })
  @IsString({ message: 'StartTime must be a valid string' })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'startTime must be in the format HH:mm',
  })
  startTime: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'endTime must be in the format HH:mm',
  })
  @IsAfter('startTime', { message: 'endTime must be after startTime' })
  endTime: string;

  @IsBoolean({ message: 'isSunday must be either true or false' })
  @IsNotEmpty({ message: 'isSunday must be either true or false' })
  isSunday: boolean;

  @IsBoolean({ message: 'isMonday must be either true or false' })
  @IsNotEmpty({ message: 'isMonday must be either true or false' })
  isMonday: boolean;

  @IsBoolean({ message: 'isTuesday must be either true or false' })
  @IsNotEmpty({ message: 'isTuesday must be either true or false' })
  isTuesday: boolean;

  @IsBoolean({ message: 'isWednesday must be either true or false' })
  @IsNotEmpty({ message: 'isWednesday must be either true or false' })
  isWednesday: boolean;

  @IsBoolean({ message: 'isThursday must be either true or false' })
  @IsNotEmpty({ message: 'isThursday must be either true or false' })
  isThursday: boolean;

  @IsBoolean({ message: 'isFriday must be either true or false' })
  @IsNotEmpty({ message: 'isFriday must be either true or false' })
  isFriday: boolean;

  @IsBoolean({ message: 'isSaturday must be either true or false' })
  @IsNotEmpty({ message: 'isSaturday must be either true or false' })
  isSaturday: boolean;
}
