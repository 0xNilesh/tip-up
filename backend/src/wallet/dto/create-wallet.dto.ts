// src/wallet/dto/create-wallet.dto.ts
import { IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IDENTIFIER_TYPE } from '../wallet.types';

export class CreateWalletDto {
  @ApiProperty({
    description: 'Type of identifier (github, twitter)',
    enum: IDENTIFIER_TYPE,
  })
  @IsEnum(IDENTIFIER_TYPE)
  identifierType: IDENTIFIER_TYPE;

  @ApiProperty({
    description: 'Identifier value (Github_username, twitter_handle)',
    example: 'xyz',
  })
  @IsString()
  identifier: string;
}
