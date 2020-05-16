import mongoose from 'mongoose';
import { prop, getModelForClass } from '@typegoose/typegoose';
import { IPost } from './PostModel';

/**
 * @description holds user model
 */

export class User {
  @prop()
  public id?: string;
  public name?: string;
  public password?: string;
  public email?: string;
  public transform?: () => User;
}

const UserModel = getModelForClass(User);

const collectionName = 'user';

/**
 * transforms user object
 * changes _id to id
 */
UserModel.schema.methods.transform = function (): any {
  const obj = this.toObject();

  const id = obj._id;
  delete obj._id;
  obj.id = id;

  return obj;
};

/**
 * User interface
 */
export interface IUser extends mongoose.Document {
  id: string;
  name: string;
  password: string;
  email: string;
  posts: [IPost];
  transform: () => IUser;
}

export default (conn: mongoose.Connection) => conn.model(collectionName, UserModel.schema);
