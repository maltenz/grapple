import mongoose from 'mongoose';
import { prop, getModelForClass, Ref, arrayProp } from '@typegoose/typegoose';
import { User } from './UserModel';
import { Shot } from './ShotModel';

/**
 * Post interface constructor
 */

export class Post {
  @prop()
  public _id?: string;
  @prop({ ref: User })
  public user?: Ref<User>;
  @arrayProp({ items: Shot })
  public shots?: Shot[];
}

const PostModel = getModelForClass(Post);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default (conn: mongoose.Connection) => conn.model('Post', PostModel.schema);
