import { Controller, Get, Delete, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AiClassificationService } from '@/services/ai-classification.service';
import { AiClassificationDto, ClassificationStatsDto } from '@/dtos/ai-classification.dto';
import { JwtAuthGuard } from '@/guards/auth.guard';
import { AdminGuard } from '@/guards/admin.guard';
import { PaginatedResponseDto, PaginationParamsDto } from '@/dtos/pagination.dto';

@Controller('ai-classifications')
@UseGuards(JwtAuthGuard, AdminGuard)
@ApiTags('AI Classifications')
@ApiBearerAuth('JWT-auth')
export class AiClassificationController {
  constructor(
    private readonly aiClassificationService: AiClassificationService,
  ) { }

  @Get('health')
  @ApiOperation({
    summary: 'Check FastAPI service health',
    description: 'Verify if the FastAPI classification service is available'
  })
  @ApiResponse({
    status: 200,
    description: 'Health check result',
    schema: {
      example: {
        statusCode: 200,
        message: 'FastAPI service health check',
        data: {
          available: true,
          url: 'http://localhost:8000/docs'
        }
      }
    }
  })
  async checkHealth() {
    const health = await this.aiClassificationService.checkFastAPIHealth();
    return {
      statusCode: 200,
      message: 'FastAPI service health check',
      data: health,
    };
  }

  @Get()
  @ApiOperation({
    summary: 'Get all AI classifications',
    description: 'Retrieve all comment classifications with pagination'
  })
  @ApiResponse({
    status: 200,
    description: 'Classifications retrieved successfully',
    type: PaginatedResponseDto
  })
  async findAll(
    @Query() query: PaginationParamsDto,
  ) {
    return this.aiClassificationService.findAll(query);
  }

  @Get('rating/:ratingId')
  @ApiOperation({
    summary: 'Get classifications for a specific rating',
    description: 'Retrieve all topic classifications for a given rating'
  })
  @ApiResponse({
    status: 200,
    description: 'Classifications found',
    type: [AiClassificationDto]
  })
  async getByRating(@Param('ratingId') ratingId: string) {
    const classifications = await this.aiClassificationService.getClassificationsByRating(ratingId);
    return {
      statusCode: 200,
      message: 'Classifications retrieved successfully',
      data: classifications,
    };
  }

  @Get('product/:productId')
  @ApiOperation({
    summary: 'Get all classifications for a product',
    description: 'Retrieve all comment classifications across all ratings for a product'
  })
  @ApiResponse({
    status: 200,
    description: 'Product classifications found',
    type: [AiClassificationDto]
  })
  async getByProduct(@Param('productId') productId: string) {
    const classifications = await this.aiClassificationService.getClassificationsByProduct(productId);
    return {
      statusCode: 200,
      message: 'Product classifications retrieved successfully',
      data: classifications,
      count: classifications.length,
    };
  }

  @Get('product/:productId/stats')
  @ApiOperation({
    summary: 'Get classification statistics for a product',
    description: 'Get aggregated topic statistics (count, confidence, percentage) for a product'
  })
  @ApiResponse({
    status: 200,
    description: 'Statistics retrieved successfully',
    type: [ClassificationStatsDto],
    schema: {
      example: {
        statusCode: 200,
        message: 'Statistics retrieved successfully',
        data: [
          {
            topicLabel: 'Keyfiyyət',
            count: 125,
            averageConfidence: 0.87,
            percentage: 35.5
          },
          {
            topicLabel: 'Qiymət',
            count: 89,
            averageConfidence: 0.82,
            percentage: 25.3
          }
        ]
      }
    }
  })
  async getProductStats(@Param('productId') productId: string) {
    const stats = await this.aiClassificationService.getProductClassificationStats(productId);
    return {
      statusCode: 200,
      message: 'Statistics retrieved successfully',
      data: stats,
    };
  }

  @Get('stats/global')
  @ApiOperation({
    summary: 'Get global topic distribution',
    description: 'Get topic statistics across all products and ratings'
  })
  @ApiResponse({
    status: 200,
    description: 'Global statistics retrieved',
    type: [ClassificationStatsDto]
  })
  async getGlobalStats() {
    const stats = await this.aiClassificationService.getGlobalTopicDistribution();
    return {
      statusCode: 200,
      message: 'Global statistics retrieved successfully',
      data: stats,
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get classification by ID',
    description: 'Retrieve a specific classification with full details'
  })
  @ApiResponse({
    status: 200,
    description: 'Classification found',
    type: AiClassificationDto
  })
  @ApiResponse({ status: 404, description: 'Classification not found' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const classification = await this.aiClassificationService.findOne(id);
    return {
      statusCode: 200,
      message: 'Classification retrieved successfully',
      data: classification,
    };
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a classification',
    description: 'Remove a classification from the system'
  })
  @ApiResponse({ status: 200, description: 'Classification deleted successfully' })
  @ApiResponse({ status: 404, description: 'Classification not found' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.aiClassificationService.remove(id);
    return {
      statusCode: 200,
      message: 'Classification deleted successfully',
    };
  }
}