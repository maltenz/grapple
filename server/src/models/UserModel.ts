import mongoose from 'mongoose';
import { prop, getModelForClass, arrayProp, Ref } from '@typegoose/typegoose';
import { Post } from './PostModel';

/**
 * User interface constructor
 */
export class User {
  _id?: mongoose.Types.ObjectId;
  @prop()
  public name?: string;
  @prop()
  public password?: string;
  @prop()
  public email?: string;
  @arrayProp({ ref: 'Post' })
  public posts?: Ref<Post>[];
  @arrayProp({ ref: 'Post' })
  public likes?: Ref<Post>[];
}

export const UserModel = getModelForClass(User);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default (conn: mongoose.Connection) => conn.model('User', UserModel.schema);
