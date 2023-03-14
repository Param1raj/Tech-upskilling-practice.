import { Arg, Query, Resolver } from "type-graphql";

@Resolver()
export class exampleHello{
    @Query(()=>String)
    sayHello(
        @Arg('name') name:string
    ){
        return `Hello Mr.${name}, have a good day!`;
    }
}