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
    async findUserByEmail(email:string){
        return await User.findOne({email}).exec();
    }
    
    async followUser(currUser:string,followUser:string){
        const c_u:any=await User.findById(currUser).exec();
        const f_u:any= await User.findById(followUser).exec();
        if(!f_u||!c_u){
            console.error("One or both users not found");
            return;
        }

        if(!c_u.user_following.includes(f_u._id)){
            c_u.user_following.push(f_u.id);
        }
          
        if(!f_u.user_followers.includes(c_u._id)){
            f_u.user_followers.push(c_u.id);
        }
        await f_u.save();
        await c_u.save();
        const populatedUser = await User.findById(currUser).populate('user_following').populate('user_followers');
        console.log(populatedUser)
        return populatedUser;
    }
}

export default new UserDAO()