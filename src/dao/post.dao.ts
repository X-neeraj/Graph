import Post,{ postInterface } from "../model/post";

class UserDAO {
    async createPost(postData:postInterface){
        const post=new Post(postData);
        return await post.save()
    }

    async getPosts(){
        return await Post.find().exec();
    }

    async getPost(postId:string){
        return await Post.findById(postId).exec();
    }

}

export default new UserDAO()