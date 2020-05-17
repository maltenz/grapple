import mongoose from 'mongoose';
import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { User } from './UserModel';

/**
 * Post interface constructor
 */
export class Post {
  _id?: mongoose.Types.ObjectId;
  @prop({ ref: User })
  public user?: Ref<User>;
}

const PostModel = getModelForClass(Post);

export default (conn: mongoose.Connection) => conn.model('Post', PostModel.schema);
