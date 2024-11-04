import mongoose,{Schema,Model,Document} from "mongoose";
import { userInterface } from "./user";

export interface postInterface extends Document {
  userId: mongoose.ObjectId | userInterface; 
  title:string;
  content:string;
  image?:string;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema: Schema<postInterface> = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  title: { type: String , required:true },
  content: { type: String , required:true },
  image: { type: String},
  }, 
  { timestamps: true }
);
  
const Post: Model<postInterface> = mongoose.model<postInterface>('post', postSchema);
export default Post;