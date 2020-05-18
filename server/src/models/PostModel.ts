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
  @arrayProp({ ref: 'Shot' })
  public shots?: Ref<Shot>;
}

const PostModel = getModelForClass(Post);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default (conn: mongoose.Connection) => conn.model('Post', PostModel.schema);
