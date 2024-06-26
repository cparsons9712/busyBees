import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  MinDate,
  IsOptional,
  ValidateIf,
} from 'class-validator';

import { IsTimeUnit } from 'src/utils/timeUnits';

export class CreateTaskDto {
  @IsString({ message: 'Title must be a string data type' })
  @IsNotEmpty({ message: 'Title is required' })
  @Length(3, 30, {
    message: 'Title must be between 3 and 30 characters long',
  })
  title: string;

  @IsOptional() // This indicates that the property is not required
  @IsNumber({}, { message: 'Block ID must be a number' })
  blockId?: number;

  @IsBoolean({
    message: 'Status should be false for uncompleted and true for completed',
  })
  status: boolean = false;

  @IsOptional()
  @IsDate({ message: 'Completed on should be a valid date' })
  completedOn?: Date;

  @IsOptional()
  @ValidateIf((o) => o.timeUnit != null)
  @IsNumber({}, { message: 'Repeat Frequency must be a number' })
  repeatFrequency?: number;

  @IsOptional()
  @ValidateIf((o) => o.repeatFrequency != null)
  @IsNumber({}, { message: 'Time unit must be a number' })
  @IsTimeUnit({ message: 'Value must be 1, 7, 30, or 91' })
  timeUnit?: number;

  @IsOptional()
  @IsDate({ message: 'Next Active On should be a valid date in the future' })
  @MinDate(new Date(), {
    message: 'Next Active On should be a valid date in the future',
  })
  nextActiveOn?: Date;
}
