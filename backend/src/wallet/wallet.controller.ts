// src/wallet/wallet.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Query,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { ApiOperation, ApiTags, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { SetPreferenceDto } from './dto/set-preference.dto';

@ApiTags('wallet')
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a wallet' })
  @ApiBody({ type: CreateWalletDto })
  async create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletService.create(
      createWalletDto.identifierType,
      createWalletDto.identifier,
    );
  }

  @Post('claim')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Claim a wallet' })
  async claim(@Request() req, @Body() body: { session: string }) {
    const token = req.headers.authorization?.split(' ')[1]; // Extract the token from Authorization header

    const userInfo = await this.walletService.getUserInfo(token);

    const identifier = userInfo.nickname; // Use the GitHub/Twitter handle as identifier
    const identifierType = userInfo.sub.split('|')[0]; // Extract identifier type

    console.log(userInfo);
    console.log(body);

    return this.walletService.claim(
      identifierType,
      identifier,
      userInfo.email,
      body.session,
    );
  }

  @Post('set-preference')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Set user preference for chain and token' })
  async setPreference(
    @Body() setPreferenceDto: SetPreferenceDto,
    @Request() req,
  ) {
    const token = req.headers.authorization?.split(' ')[1]; // Extract the token from Authorization header

    const userInfo = await this.walletService.getUserInfo(token);

    const identifier = userInfo.nickname; // Use the GitHub/Twitter handle as identifier
    const identifierType = userInfo.sub.split('|')[0]; // Extract identifier type
    return this.walletService.setPreference(
      identifierType,
      identifier,
      setPreferenceDto.chain,
      setPreferenceDto.token,
    );
  }

  @Get('preference')
  async getPreference(
    @Query('identifier') identifier: string,
    @Query('identifierType') identifierType: string,
  ) {
    if (!identifier || !identifierType) {
      throw new Error('Both identifier and identifierType are required.');
    }

    return this.walletService.getPreference(identifierType, identifier);
  }

  @Get('wallet')
  @UseGuards(AuthGuard('jwt'))
  async getwallet(@Request() req) {
    const token = req.headers.authorization?.split(' ')[1]; // Extract the token from Authorization header

    if (!token) {
      throw new Error('Authorization token not provided');
    }

    const userInfoUrl = 'https://dev-o7z6ei3bl6iph6qv.us.auth0.com/userinfo';

    try {
      // Use fetch to call the userinfo endpoint
      const response = await fetch(userInfoUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch user information: ${response.statusText}`,
        );
      }

      const userInfo = await response.json(); // Parse the JSON response
      console.log('User Info:', userInfo);

      const identifier = userInfo.nickname; // Use the GitHub/Twitter handle as identifier
      const identifierType = userInfo.sub.split('|')[0]; // Extract identifier type

      return this.walletService.getWallet(identifierType, identifier);
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw new Error('Failed to fetch user information from Auth0.');
    }
  }
}
