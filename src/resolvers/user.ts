import { ServerContext } from "../types/ServerContext";
import { Ctx, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async currentUser(@Ctx() { req }: ServerContext): Promise<User | undefined | null> {
    console.log(req);
    // return User.findOne();
    return null;
  }
}
