// import { GraphQLError } from "graphql";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../../Entities/User.enity";
import { MyContext, registerUserInputType } from "./types";
import bcrypt from 'bcryptjs'


@Resolver()
export class UserResolver{
    @Query(()=>String)
    async user():Promise<String>{
        return 'hellow'
    }

    @Mutation(()=>User)
    async registerUser(
        @Arg('inputs') inputs:registerUserInputType
    ):Promise<User>{
        // console.log(inputs);
        const hashedPassword = await bcrypt.hash(inputs.password,12);
        const user = await User.create({
            name:inputs.name,
            email:inputs.email,
            password:hashedPassword,
        }).save()
        // user
        // console.log(user);
        return user;
    }

    @Mutation(()=>User)
    async login(
        @Arg("email") email:string,
        @Arg('password') password:string,
        @Ctx() ctx : MyContext,
    ):Promise<User|null>{
        const user = await User.findOne({where:{email}});
        if(!user){
            return null
        }
        const valid = await bcrypt.compare(password,user.password);

        if(!valid){
            return null;
        }
        
        ctx.req.session!.id = user.id.toString(); 
        return user;
    }
}