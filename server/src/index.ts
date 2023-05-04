import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import mikroOrmConfig from "./mikro-orm.config";
import express from "express";
import {ApolloServer} from "apollo-server-express";
import {buildSchema} from "type-graphql";
import { TokenResolver } from "./resolvers/token";
import dotenv from "dotenv";

dotenv.config()

const main = async () => {
    const orm = await MikroORM.init(mikroOrmConfig);
    await orm.getMigrator().up();
    
    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [TokenResolver],
            validate: false
        }),
        context: () => ({ em: orm.em })
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({app});

    app.listen(process.env.PORT, () => console.log("Listening on port 4000...."));
};

main().catch(err => console.error(err));