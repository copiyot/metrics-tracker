import { Token } from "../entities/Token";
import { Ctx, Query, Resolver, Arg, Mutation, Int, InputType, Field, ObjectType } from "type-graphql";

import { MyContext } from "../types";
import { tokenTotal } from "../utils/getTokensTotal";

@InputType()
class CreateTokenInput{
    @Field()
    name: string

    @Field()
    value: number
}

@ObjectType()
class TokenStats {
    @Field()
    name: string

    @Field()
    tokenPerMin: number

    @Field()
    tokenPerHour: number

    @Field()
    tokenPerDay: number
}

@Resolver()
export class TokenResolver {
    @Query(()=> [Token])
    tokens(
        @Ctx() { em }: MyContext
    ):Promise<Token[]>{
        return em.find(Token, {})
    }

    @Query(()=> Token, {nullable: true})
    token(
        @Arg('id') id: number,
        @Ctx() { em }: MyContext
    ):Promise<Token | null>{
        return em.findOne(Token, {id})
    }

    @Query(()=> [TokenStats])
    async tokensStatistics(
        @Ctx() { em }: MyContext
    ):Promise<TokenStats[]>{
        let tokensStatistic = [];

        const postPaid = await em.find(Token, {name: 'Post Paid'});
        const pretPaid = await em.find(Token, {name: 'Pre Paid'});
        const largePower = await em.find(Token, {name: 'Large Power'});

        /**
         * Getting tokens totals
         */
        const postPaidTokensTotal = tokenTotal(postPaid);
        const prePaidTokensTotal = tokenTotal(pretPaid);
        const largePowerTokensTotal = tokenTotal(largePower);

        /**
         * Getting tokens time periods
         */
        const connection = em.getConnection();
        let postPaidTokenMinTime = await connection.execute("select MIN(created_at) from token where name = 'Post Paid'");
        postPaidTokenMinTime = postPaidTokenMinTime[0].min.getTime();

        let prePaidTokenMinTime = await connection.execute("select MIN(created_at) from token where name = 'Pre Paid'");
        prePaidTokenMinTime = prePaidTokenMinTime[0].min.getTime();

        let largePowerTokenMinTime = await connection.execute("select MIN(created_at) from token where name = 'Large Power'");
        largePowerTokenMinTime = largePowerTokenMinTime[0].min.getTime();

        /**
         * STATS
         * Post Paid
         */
        const postPaidTokenPerMinute = postPaidTokensTotal/(Math.ceil((Date.now() - postPaidTokenMinTime)/60000));
        const postPaidTokenPerHour = postPaidTokensTotal/(Math.ceil((Date.now() - postPaidTokenMinTime)/3600000));
        const postPaidTokenPerDay = postPaidTokensTotal/(Math.ceil((Date.now() - postPaidTokenMinTime)/86400000));

        let postPaidStat = {
            name: 'Post Paid',
            tokenPerMin: postPaidTokenPerMinute,
            tokenPerHour: postPaidTokenPerHour,
            tokenPerDay: postPaidTokenPerDay
        }

        tokensStatistic.push(postPaidStat);

        /**
         * STATS
         * Pre Paid
         */
         const prePaidTokenPerMinute = prePaidTokensTotal/(Math.ceil((Date.now() - prePaidTokenMinTime)/60000));
         const prePaidTokenPerHour = prePaidTokensTotal/(Math.ceil((Date.now() - prePaidTokenMinTime)/3600000));
         const prePaidTokenPerDay = prePaidTokensTotal/(Math.ceil((Date.now() - prePaidTokenMinTime)/86400000));

         let prePaidStat = {
            name: 'Pre Paid',
            tokenPerMin: prePaidTokenPerMinute,
            tokenPerHour: prePaidTokenPerHour,
            tokenPerDay: prePaidTokenPerDay
        }

        tokensStatistic.push(prePaidStat);
         /**
         * STATS
         * Pre Paid
         */
          const largePowerTokenPerMinute = largePowerTokensTotal/(Math.ceil((Date.now() - largePowerTokenMinTime)/60000));
          const largePowerTokenPerHour = largePowerTokensTotal/(Math.ceil((Date.now() - largePowerTokenMinTime)/3600000));
          const largePowerTokenPerDay = largePowerTokensTotal/(Math.ceil((Date.now() - largePowerTokenMinTime)/86400000));

          let largePowerStat = {
            name: 'Large Power',
            tokenPerMin: largePowerTokenPerMinute,
            tokenPerHour: largePowerTokenPerHour,
            tokenPerDay: largePowerTokenPerDay
        }

        tokensStatistic.push(largePowerStat);
         
        return tokensStatistic;
    }

    @Mutation(()=> Token)
    async createToken(
        @Arg('options') options: CreateTokenInput,
        @Ctx() { em }: MyContext
    ):Promise<Token>{
        const {name, value} = options;
        const token = em.create(Token, { name , value});
        await em.persistAndFlush(token);
        return token;
    }

    @Mutation(()=> Token, {nullable: true})
    async updateToken(
        @Arg('id') id: number,
        @Arg('name', () => String, {nullable: true}) name: string,
        @Arg('value', () => Int, {nullable: true}) value: number,
        @Ctx() { em }: MyContext
    ):Promise<Token | null>{
        const token =await em.findOne(Token, { id });
        if(!token){
            return null;
        }

        if(name){
            token.name = name;
            await em.persistAndFlush(token);
        }

        if(value){
            token.value = value;
            await em.persistAndFlush(token);
        }
        
        return token;
    }

    @Mutation(()=> Boolean)
    async deleteToken(
        @Arg('id') id: number,
        @Ctx() { em }: MyContext
    ):Promise<boolean>{
        try{
            await em.nativeDelete(Token, { id });
        } catch(error){
            return false
        }
        
        return true;
    }
}
