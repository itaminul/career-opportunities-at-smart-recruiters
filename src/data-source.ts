import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'erpdb',
  password: '123456',
  database: 'all_services_db',
  synchronize: false,
  logging: true,
  entities: [],
  migrations: ['./dist/migrations/*.js'],
  subscribers: [],
});
