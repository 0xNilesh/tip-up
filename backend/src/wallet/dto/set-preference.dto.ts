import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SetPreferenceDto {
  @ApiProperty({
    description:
      'Chain to set preference for (ethereum, polygon, arbitrum, optimism etc)',
    example: 'arbitrum',
  })
  @IsString()
  chain: string;

  @ApiProperty({
    description: 'Token to set preference for',
    example: 'USDC',
  })
  @IsString()
  token: string;
}
