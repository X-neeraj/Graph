import mongoose, { Types, Schema, Model } from 'mongoose'

export interface userInterface extends Document{
    _id:Types.ObjectId;
    name: string;
    email: string;
    password: string;
    user_following:any;
    user_followers:any;
    createdAt: Date;
    updatedAt: Date;
}
const userSchema: Schema<userInterface> =new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    user_following: { type: [mongoose.Schema.Types.ObjectId], default:[], ref:'User'},
    user_followers: { type: [mongoose.Schema.Types.ObjectId], default:[], ref:'User'},
  },
  { timestamps: true }
)

const User: Model<userInterface> = mongoose.model<userInterface>('User', userSchema);
export default User;