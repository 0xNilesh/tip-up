// src/app.controller.ts
import { Controller, Get, HttpStatus } from '@nestjs/common';
import { Response } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('health')
  healthCheck(@Response() res) {
    return res.status(HttpStatus.OK).json({
      status: 'ok',
      message: 'Application is running smoothly.',
    });
  }
}
