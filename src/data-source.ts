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


// npm run typeorm -- migration:generate -d ./dist/data-source.js ./src/migrations/CreateEmployeeAndDepartmentTables
// npm run typeorm -- migration:run -d ./data-source.ts
//npm run typeorm -- migration:run -d ./dist/data-source.js -- -n <MigrationName>

// npm run migration:generate
// npm run migration:run
//npm run typeorm -- migration:run -d ./src/data-source.ts

//npm run typeorm migration:create -n CreateUsersTable
//npm run typeorm -- migration:run -d ./dist/data-source.js -- - n CreateUsersTable

//npm run typeorm -- migration:run -d ./dist/data-source.js
//npm run typeorm -- migration:run -d ./src/data-source.ts

//npm run migration:generate -- src/migrations/MigrationName

//npm run typeorm migration:create -n CreateUsersTable

