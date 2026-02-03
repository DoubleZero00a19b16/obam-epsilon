import { Controller, Get, Post, Body, Param, Query, UseGuards, Req, HttpStatus, HttpCode, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { OrdersService } from '../services/orders.service';
import { MyOrdersResponseDto, GetMyOrdersQueryDto, ProductInOrderDto, DeleteOrderResponseDto } from '../dtos/order.dto';
import { CreateOrderDto, OrderCreatedResponseDto } from '../dtos/create-order.dto';
import { JwtAuthGuard } from '@/guards/auth.guard';
import { AdminGuard } from '@/guards/admin.guard';
import { PaginationParamsDto, PaginatedResponseDto } from '@/dtos/pagination.dto';

/**
 * Controller for order and purchase history operations
 * All endpoints require authentication
 */
@ApiTags('orders')
@Controller('orders')
@UseGuards(JwtAuthGuard) // Uncomment when implementing authentication
@ApiBearerAuth('JWT-auth')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  /**
   * POST /orders
   * Create a new order with products
  */
  @UseGuards(AdminGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create new order',
    description: 'Create a new order by providing bonus card and products. Automatically calculates total and bonus cashback (5%).',
  })
  @ApiResponse({
    status: 201,
    description: 'Order created successfully',
    type: OrderCreatedResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid bonus card, products not found, or validation error',
  })
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<{
    statusCode: number;
    message: string;
    data: OrderCreatedResponseDto;
  }> {
    const order = await this.ordersService.createOrder(createOrderDto);

    return {
      statusCode: HttpStatus.CREATED,
      message: `Order created successfully! You earned $${order.bonusEarned.toFixed(2)} in cashback bonus.`,
      data: order
    };
  }

  /**
   * GET /orders
   * Admin: Fetch all orders with pagination
   */
  @Get()
  @UseGuards(AdminGuard)
  @ApiOperation({
    summary: 'Get all orders (Admin)',
    description: 'Retrieve a paginated list of all orders across the system (Admin only).',
  })
  @ApiResponse({
    status: 200,
    description: 'Orders retrieved successfully',
    type: PaginatedResponseDto,
  })
  async findAll(
    @Query() query: GetMyOrdersQueryDto,
  ): Promise<PaginatedResponseDto<MyOrdersResponseDto>> {
    return this.ordersService.findAll(query);
  }

  /**
   * GET /orders/my-orders
   * Fetch user's purchase history with products sorted by:
   * 1. PL (Private Label) status - PL products first
   * 2. Rating count - Most popular products first
   */
  @Get('my-orders')
  @ApiOperation({
    summary: 'Get my orders',
    description: 'Retrieve user\'s purchase history. Products are automatically sorted by PL status (PL first) and then by popularity (rating count).',
  })
  @ApiResponse({
    status: 200,
    description: 'Orders retrieved successfully with sorted products',
    type: [MyOrdersResponseDto],
  })
  async getMyOrders(
    @Query() query: GetMyOrdersQueryDto,
  ): Promise<PaginatedResponseDto<MyOrdersResponseDto>> {
    const orders = await this.ordersService.getMyOrders(query);

    return orders;
  }

  /**
   * GET /orders/admin/:orderId
   * Admin: Get details of any order
   */
  @Get('admin/:orderId')
  @UseGuards(AdminGuard)
  @ApiOperation({
    summary: 'Get order by ID (Admin)',
    description: 'Retrieve detailed information about any order (Admin only)',
  })
  @ApiParam({
    name: 'orderId',
    description: 'UUID of the order',
  })
  @ApiResponse({
    status: 200,
    description: 'Order details retrieved successfully',
    type: MyOrdersResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Order not found',
  })
  async getOrderByIdAdmin(
    @Param('orderId') orderId: string,
  ): Promise<{
    statusCode: number;
    data: MyOrdersResponseDto;
  }> {
    const order = await this.ordersService.getOrderByIdAdmin(orderId);

    return {
      statusCode: HttpStatus.OK,
      data: order
    };
  }

  /**
   * GET /orders/:orderId
   * Get details of a specific order
   */
  @Get(':orderId')
  @ApiOperation({
    summary: 'Get order by ID',
    description: 'Retrieve detailed information about a specific order',
  })
  @ApiParam({
    name: 'orderId',
    description: 'UUID of the order',
    example: '550e8400-e29b-41d4-a716-446655440030',
  })
  @ApiResponse({
    status: 200,
    description: 'Order details retrieved successfully',
    type: MyOrdersResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Order not found',
  })
  async getOrderById(
    @Param('orderId') orderId: string,
  ): Promise<{
    statusCode: number;
    data: MyOrdersResponseDto;
  }> {
    const order = await this.ordersService.getOrderById(orderId);

    return {
      statusCode: HttpStatus.OK,
      data: order
    };
  }

  /**
   * GET /orders/my-orders/unrated
   * Get products that haven't been rated yet
   */
  @Get('my-orders/unrated')
  @ApiOperation({
    summary: 'Get unrated products',
    description: 'Retrieve all products from completed orders that the user hasn\'t rated yet. Perfect for prompting reviews.',
  })
  @ApiResponse({
    status: 200,
    description: 'Unrated products retrieved successfully',
    type: [ProductInOrderDto],
  })
  async getUnratedProducts(): Promise<{
    statusCode: number;
    message: string;
    data: ProductInOrderDto[];
  }> {
    const products = await this.ordersService.getUnratedProducts();

    return {
      statusCode: HttpStatus.OK,
      message: products.length > 0
        ? `You have ${products.length} product(s) waiting for your review! Rate them to earn bonus points.`
        : 'Great job! You\'ve rated all your purchased products.',
      data: products
    };
  }

  /**
   * GET /orders/my-orders/stats
   * Get order statistics
   */
  @Get('my-orders/stats')
  @ApiOperation({
    summary: 'Get order statistics',
    description: 'Get user\'s order statistics including total orders, total spent, and total bonus earned',
  })
  @ApiResponse({
    status: 200,
    description: 'Order statistics retrieved successfully',
    schema: {
      properties: {
        statusCode: { type: 'number', example: 200 },
        data: {
          type: 'object',
          properties: {
            totalOrders: { type: 'number', example: 12 },
            totalSpent: { type: 'number', example: 456.78 },
            totalBonusEarned: { type: 'number', example: 22.84 },
          },
        },
      },
    },
  })
  async getOrderStats(): Promise<{
    statusCode: number;
    data: {
      totalOrders: number;
      totalSpent: number;
      totalBonusEarned: number;
    };
  }> {
    const stats = await this.ordersService.getOrderStats();

    return {
      statusCode: HttpStatus.OK,
      data: stats
    };
  }

  /**
   * DELETE /orders/:id
   * Admin: Delete an order
   */
  @Delete(':id')
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Delete order (Admin)',
    description: 'Delete an order and all its related data (items, credits). Admin only.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID of the order to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'Order deleted successfully',
    type: DeleteOrderResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Order not found',
  })
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<DeleteOrderResponseDto> {
    return this.ordersService.deleteOrder(id);
  }
}