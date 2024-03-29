import { Exclude } from 'class-transformer';

export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
}

export class SerializedUser {
  id: number;
  email: string;
  name: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<SerializedUser>) {
    Object.assign(this, partial);
  }
}
