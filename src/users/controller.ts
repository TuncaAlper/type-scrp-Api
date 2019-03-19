// src/user/controller.ts
import { JsonController, Get, Param, Put, Body, 
    Post, HttpCode, NotFoundError } from 'routing-controllers'
import User from './entity'


@JsonController()
export default class UserController {

@Get('/users/:id')
getUser(
    @Param('id') id: number
) {
    return User.findOne(id)
};

@Get('/users')
async allUsers () {
    const users = await User.find()
    return {users}

};

@Put('/users/:id')
async updateUser(
    @Param('id') id: number,
    @Body() update: Partial<User>
) {
    // console.log(`Incoming PUT body param:`, update)
    const user = await User.findOne(id)
    if (!user) throw new NotFoundError('Cannot find user')

    return User.merge(user, update).save()
};

@Post('/users')
@HttpCode(201)
createUser(
    @Body() user: User
) {
    // console.log(`Incoming POST body param:`, user)
    return user.save()
};
}