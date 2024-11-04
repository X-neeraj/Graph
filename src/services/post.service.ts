import postDao from "../dao/post.dao";
import { postDTO } from "../dto/post.dto";
import { postInterface } from "../model/post";

class postService{
    async createPost(postData:postInterface){
        const post =await postDao.createPost(postData);
        return new postDTO(post);
    }
    async getAllPost(){
        const posts =await postDao.getPosts();
        const res=posts.map(post => new postDTO(post))
        return res;
    }
    async getPost(postId:string){
        const post:any =await postDao.getPost(postId);
        return new postDTO(post);
    }
}

export default new postService();