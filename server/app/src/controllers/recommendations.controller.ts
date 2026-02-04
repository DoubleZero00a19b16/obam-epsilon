import { Body, Controller, Get, Param, ParseArrayPipe, ParseUUIDPipe, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/guards/auth.guard';
import { AdminGuard } from '@/guards/admin.guard';
import { RecommendationsService } from '@/services/recommendations.service';
import { CreateRecommendationDto, GetRecommendationsQueryDto } from '@/dtos/recommendation.dto';

@ApiTags('recommendations')
@Controller('recommendations')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, AdminGuard)
export class RecommendationsController {
  constructor(private readonly recommendationsService: RecommendationsService) { }

  @Post()
  @ApiOperation({ summary: 'Create recommendation (Admin)' })
  create(@Body() dto: CreateRecommendationDto) {
    return this.recommendationsService.create(dto);
  }

  @Post('bulk')
  @ApiOperation({ summary: 'Create recommendations in bulk (Admin)' })
  createBulk(
    @Body(new ParseArrayPipe({ items: CreateRecommendationDto })) dtos: CreateRecommendationDto[],
  ) {
    return this.recommendationsService.createMany(dtos);
  }

  @Get()
  @ApiOperation({ summary: 'List recommendations (Admin)' })
  findAll(@Query() query: GetRecommendationsQueryDto) {
    return this.recommendationsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get recommendation by id (Admin)' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.recommendationsService.findOne(id);
  }

  @Post(':id/approve')
  @ApiOperation({ summary: 'Approve recommendation (Admin)' })
  approve(@Param('id', ParseUUIDPipe) id: string) {
    return this.recommendationsService.approve(id);
  }

  @Post(':id/deny')
  @ApiOperation({ summary: 'Deny recommendation (Admin)' })
  deny(@Param('id', ParseUUIDPipe) id: string) {
    return this.recommendationsService.deny(id);
  }
}
