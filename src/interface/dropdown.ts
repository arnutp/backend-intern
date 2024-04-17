import { ApiProperty } from '@nestjs/swagger';

export class DropdownModel<T = string> {
  @ApiProperty()
  value: T;

  @ApiProperty()
  text: string;
}
