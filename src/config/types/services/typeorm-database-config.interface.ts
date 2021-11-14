export interface TypeormDatabaseConfigInterface {
  dbHost: string;
  dbName: string;
  dbPassword: string;
  dbPort: string;
  dbUser: string;
  dbDialect: 'postgres' | 'mysql';
}
