import { DataSource, DataSourceOptions } from "typeorm";
import { Users } from "./entity/Users";
import { Photo } from "./entity/Photo";
import { Resume } from "./entity/resume";
import { Resume_attachments } from "./entity/Resume_attachements";
import { JobCandidate } from "./entity/job_candidate";
import { SelectedResume } from "./entity/selectedresume";

// Export DataSourceOptions directly without instantiating DataSource
export const AppDataSource: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "erpdb",
  password: "123456",
  database: "all_services_db",
  entities: [Photo, Resume, Resume_attachments, JobCandidate, SelectedResume],
  // migrations: ['./src/migrations/*.ts'],
  migrations: ["./dist/migrations/*.js"],
  synchronize: false,
  logging: true,
};

const dataSource = new DataSource(AppDataSource);
export default dataSource;

//npx typeorm-ts-node-commonjs migration:generate src/migrations/CreatePhotoTable -d src/data-source.ts
//npx typeorm-ts-node-commonjs migration:run -d src/data-source.ts
//npx typeorm-ts-node-commonjs migration:generate src/migrations/CreateAllTables -d src/data-source.ts --timestamp
//npx typeorm-ts-node-commonjs migration:generate src/migrations/CreateAllTables -d src/data-source.ts
//npx typeorm-ts-node-commonjs migration:generate src/migrations/CreateUsersTables -d src/data-source.ts
