import { IsEmail, IsEnum, IsString } from 'class-validator';
import { IDENTIFIER_TYPE } from '../wallet.types';

export class GetWalletDto {
  @IsEmail()
  mail: string;
}
