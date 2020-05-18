import mongoose from 'mongoose';
import { prop, getModelForClass, Ref, arrayProp } from '@typegoose/typegoose';
import { User } from './UserModel';
import { Shot } from './ShotModel';

/**
 * Post interface constructor
 */

export class Post {
  _id?: mongoose.Types.ObjectId;
  @prop({ ref: User })
  public user?: Ref<User>;
  @arrayProp({ items: Shot })
  public shots?: Shot[];
}

const PostModel = getModelForClass(Post);

export default (conn: mongoose.Connection) => conn.model('Post', PostModel.schema);
