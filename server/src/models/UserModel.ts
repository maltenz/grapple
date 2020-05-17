import mongoose from 'mongoose';
import { prop, getModelForClass } from '@typegoose/typegoose';
import { Post } from './PostModel';

/**
 * User interface constructor
 */
export class User {
  @prop()
  public id?: string;
  @prop()
  public name?: string;
  @prop()
  public password?: string;
  @prop()
  public email?: string;
  @prop()
  public posts?: Array<Post>;
}

const UserModel = getModelForClass(User);

const collectionName = 'user';

export default (conn: mongoose.Connection) => conn.model(collectionName, UserModel.schema);
