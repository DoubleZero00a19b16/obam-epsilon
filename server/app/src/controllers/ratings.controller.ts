import { Controller, Post, Get, Body, Param, UseGuards, Req, HttpStatus, HttpCode, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { RatingsService } from '../services/ratings.service';
import { CreateRatingDto, RatingResponseDto, ProductRatingStatsDto } from '../dtos/rating.dto';
import { JwtAuthGuard } from '@/guards/auth.guard';
import { AiClassificationService } from '@/services/ai-classification.service';
import { UpdateRatingDto } from '@/dtos/update-rating.dto';
import { AdminGuard } from '@/guards/admin.guard';

/**
 * Controller for product rating operations
 * All endpoints require authentication
 */
@ApiTags('ratings')
@Controller('ratings')
@UseGuards(JwtAuthGuard) // Uncomment when implementing authentication
@ApiBearerAuth('JWT-auth')
export class RatingsController {
  constructor(
    private readonly ratingsService: RatingsService,
    private readonly aiClassificationService: AiClassificationService
  ) { }

  /**
   * POST /ratings
   * Submit a new product rating
   * Automatically calculates and awards bonus points based on product type
  */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Submit a product rating',
    description: 'Rate a product you have purchased. Earn 30 points for PL products or 10 points for normal products. Comment is always optional.',
  })
  @ApiResponse({
    status: 201,
    description: 'Rating successfully created and bonus points awarded',
    type: RatingResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid input',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found or is not active',
  })
  @ApiResponse({
    status: 409,
    description: 'User has already rated this product',
  })
  async createRating(
    @Body() createRatingDto: CreateRatingDto,
  ): Promise<{
    statusCode: number;
    message: string;
    data: RatingResponseDto;
  }> {
    const rating = await this.ratingsService.createRating(createRatingDto);

    return {
      statusCode: HttpStatus.CREATED,
      message: `Rating submitted successfully! You earned ${rating.rewardPoints} bonus points ($${rating.rewardAmount.toFixed(2)})`,
      data: rating
    };
  }

  // PUT /api/v1/ratings/:id
  @Put(':id')
  async updateRating(
    @Param('id') ratingId: string,
    @Body() updateRatingDto: UpdateRatingDto,
  ) {
    const updatedRating = await this.ratingsService.updateRating(
      ratingId,
      updateRatingDto
    );
    return {
      statusCode: 200,
      message: 'Rating updated successfully',
      data: updatedRating
    };
  }

  /**
   * GET /ratings/product/:productId
   * Get all ratings for a specific product
   */
  @UseGuards(AdminGuard)
  @Get('product/:productId')
  @ApiOperation({
    summary: 'Get product ratings',
    description: 'Retrieve all ratings and reviews for a specific product',
  })
  @ApiParam({
    name: 'productId',
    description: 'UUID of the product',
    example: '550e8400-e29b-41d4-a716-446655440012',
  })
  @ApiResponse({
    status: 200,
    description: 'List of ratings for the product',
    type: [RatingResponseDto],
  })
  async getProductRatings(
    @Param('productId') productId: string,
  ): Promise<{
    statusCode: number;
    data: RatingResponseDto[];
  }> {
    const ratings = await this.ratingsService.getProductRatings(productId);

    return {
      statusCode: HttpStatus.OK,
      data: ratings
    };
  }

  /**
   * GET /ratings/product/:productId/stats
   * Get rating statistics for a product (average, count, distribution)
  */
  @UseGuards(AdminGuard)
  @Get('product/:productId/stats')
  @ApiOperation({
    summary: 'Get product rating statistics',
    description: 'Get aggregated rating data including average, total count, and distribution by star level',
  })
  @ApiParam({
    name: 'productId',
    description: 'UUID of the product',
    example: '550e8400-e29b-41d4-a716-446655440012',
  })
  @ApiResponse({
    status: 200,
    description: 'Rating statistics for the product',
    type: ProductRatingStatsDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  async getProductRatingStats(
    @Param('productId') productId: string,
  ): Promise<{
    statusCode: number;
    data: ProductRatingStatsDto;
  }> {
    const stats = await this.ratingsService.getProductRatingStats(productId);

    return {
      statusCode: HttpStatus.OK,
      data: stats
    };
  }

  /**
   * GET /ratings/my-ratings
   * Get all ratings submitted by the authenticated user
  */
  @Get('my-ratings')
  @ApiOperation({
    summary: 'Get my ratings',
    description: 'Retrieve all ratings submitted by the authenticated user',
  })
  @ApiResponse({
    status: 200,
    description: 'List of user\'s ratings',
    type: [RatingResponseDto],
  })
  async getMyRatings(): Promise<{
    statusCode: number;
    data: RatingResponseDto[];
  }> {
    const ratings = await this.ratingsService.getUserRatings();

    return {
      statusCode: HttpStatus.OK,
      data: ratings
    };
  }
}