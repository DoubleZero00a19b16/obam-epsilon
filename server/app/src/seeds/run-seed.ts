import { DataSource } from 'typeorm';
import { seedDatabase } from './seed';
import * as dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'bonus_card_rating',
  entities: ['src/entities/**/*.entity.ts'],
  synchronize: false,
});

async function run() {
  try {
    console.log('Connecting to database...');
    await AppDataSource.initialize();
    
    await seedDatabase(AppDataSource);
    
    await AppDataSource.destroy();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

run();
