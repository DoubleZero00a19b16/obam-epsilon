import { CreateProductDto } from '@/dtos/create-product.dto';
import { UpdateProductDto } from '@/dtos/update-product.dto';
import { Product } from '@/entities/product.entity';
import { Rating } from '@/entities/rating.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {

  constructor(
      @InjectRepository(Product)
      private productRepository: Repository<Product>,

      @InjectRepository(Rating)
      private ratingRepository: Repository<Rating>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  async findAll() {
    const products: Product[] = await this.productRepository.find();

    return products
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async findTop() {
    const top10Products = await this.productRepository
      .createQueryBuilder('product')
      .where('product.is_active = :active', { active: true })
      .orderBy('product.average_rating', 'DESC')
      .limit(10)
      .getMany();

const data = await Promise.all(
  top10Products.map(async (item) => {
    const lastTwoReviews = await this.ratingRepository
      .createQueryBuilder('rating')
      .leftJoin('rating.user', 'user')
      .select([
        'rating.id AS id',
        'rating.userId AS "userId"',
        'user.name AS name',
        'rating.comment AS comment',
        'rating.createdAt AS "createdAt"',
        'rating.score AS "score"'
      ])
      .where('rating.productId = :productId', { productId: item.id })
      .orderBy('rating.createdAt', 'DESC')
      .limit(2)
      .getRawMany();

    const ratingDistributionRaw = await this.ratingRepository
      .createQueryBuilder('rating')
      .select('rating.score', 'score')
      .addSelect('COUNT(*)', 'count')
      .where('rating.productId = :productId', { productId: item.id })
      .groupBy('rating.score')
      .getRawMany();

    const ratingDistribution = { 5:0, 4:0, 3:0, 2:0, 1:0 };
    ratingDistributionRaw.forEach(r => {
      ratingDistribution[Number(r.score)] = Number(r.count);
    });

    return {
      ...item,
      comments: lastTwoReviews,
      ratingDistribution
    };
  })
);

return data;

  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id); // Reuses findOne to check existence
    const updated = this.productRepository.merge(product, updateProductDto);
    return await this.productRepository.save(updated);
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }
}
