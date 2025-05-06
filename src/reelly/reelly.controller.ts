import { Controller, Get, Query, Headers } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller('reelly')
export class ReellyController {
  constructor(private readonly httpService: HttpService) {}

  @Get('properties')
  async getProperties(@Query('search_query') searchQuery: string) {
    const url = `https://search-listings-production.up.railway.app/v1/properties?search_query=${searchQuery}`;
    const response = await firstValueFrom(
      this.httpService.get(url, {
        headers: {
          'X-API-Key': 'reelly-681482a2-D0oBFrWtulBagRyrQuiQhzYlQ6OCZVoH',
        },
      }),
    );
    return response.data;
  }
}
