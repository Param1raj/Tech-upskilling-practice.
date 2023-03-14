import { IsEmail, Length } from "class-validator";
import { Request } from "express";
import { Field, InputType } from "type-graphql";
import { User } from "../../Entities/User.enity";

@InputType()
export class registerUserInputType implements Partial<User>{
    @Field()
    @Length(2,10)
    name: string;

    @Field()
    @IsEmail()
    email:string;

    @Field()
    password: string;
}

export interface MyContext{
    req:Request;
}