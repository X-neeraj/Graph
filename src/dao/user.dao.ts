import User,{userInterface} from "../model/user";

class UserDAO {
    async createUser(userData:userInterface){
        const user=new User(userData);
        return await user.save()
    }

    async getUsers(){
        return await User.find().exec();
    }

    async findUser(id:string){
        return await User.findById(id).exec();
    }
}

export default new UserDAO()