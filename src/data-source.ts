import { DataSource, DataSourceOptions } from "typeorm";
import { Users } from "./entity/Users";
import { Resume } from "./entity/resume";
import { NewTest } from "./entity/newTest";
import { Resume_attachments } from "./entity/resume_attachments";

// Export DataSourceOptions directly without instantiating DataSource
export const AppDataSource: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "erpdb",
  password: "123456",
  database: "all_services_db",
  entities: [Users, Resume, Resume_attachments, NewTest],
  migrations: ["./dist/migrations/*.js"],  // Path for TypeScript migrations
  synchronize: true,
  logging: true,
};

const dataSource = new DataSource(AppDataSource);
export default dataSource;

//npx typeorm-ts-node-commonjs migration:generate src/migrations/CreatePhotoTable -d src/data-source.ts
//npx typeorm-ts-node-commonjs migration:run -d src/data-source.ts
//npx typeorm-ts-node-commonjs migration:generate src/migrations/CreateAllTables -d src/data-source.ts --timestamp
//npx typeorm-ts-node-commonjs migration:generate src/migrations/CreateAllTables -d src/data-source.ts
//npx typeorm-ts-node-commonjs migration:generate src/migrations/CreateUsersTables -d src/data-source.ts

