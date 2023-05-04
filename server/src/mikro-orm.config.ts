import { __prod__ } from "./constants";
import { Token } from "./entities/Token";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
import dotenv from "dotenv";

dotenv.config()

export default {
    migrations: {
        path: path.join(__dirname, './migrations'),
        glob: '!(*.d).{js,ts}',
    },
    entities:[Token],
    dbName: process.env.DB_NAME,
    type: 'postgresql',
    user: process.env.USER,
    password: process.env.PASSWORD,
    debug: !__prod__,
    allowGlobalContext: true
} as Parameters<typeof MikroORM.init>[0];