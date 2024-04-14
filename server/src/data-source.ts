import "reflect-metadata"
import { DataSource } from "typeorm"
import { Post } from "./entity/Post"

const { db } = require('./config')

export const AppDataSource = new DataSource({
    type: db.type,
    host: db.host,
    port: db.port,
    username: db.username,
    password: db.password,
    database: db.database,
    synchronize: true,
    logging: false,
    entities: [Post],
    migrations: [],
    subscribers: [],
})
