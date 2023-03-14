import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../Entities/User.enity';


export const AppDataSource = new DataSource({ 
  name: "default", 
  type: "postgres", 
  host: "localhost", 
  port: 5432, 
  username: "digited", 
  password: "digited@123", 
  database: "Testing",
  synchronize: true,
  logging: true,
  entities: [User]
}
)