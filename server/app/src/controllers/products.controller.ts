import { CreateProductDto } from '@/dtos/create-product.dto';
import { UpdateProductDto } from '@/dtos/update-product.dto';
import { AdminGuard } from '@/guards/admin.guard';
import { JwtAuthGuard } from '@/guards/auth.guard';
import { ProductsService } from '@/services/products.service';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { PaginationParamsDto } from '@/dtos/pagination.dto';

@Controller('products')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
@ApiTags("products")
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService
  ) { }

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get('top')
  async findTop() {
    return await this.productsService.findTop();
  }

  @UseGuards(AdminGuard)
  @Get()
  @ApiOperation({ summary: 'Get all products with pagination' })
  findAll(@Query() query: PaginationParamsDto) {
    return this.productsService.findAll(query);
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.findOne(id);
  }


  @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}
